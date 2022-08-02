import { Activity } from './../models/activity'
import { action, makeAutoObservable, makeObservable, observable } from 'mobx'
import { v4 as uuid, v4 } from 'uuid'

import agent from '../api/agent'

export default class ActivityStore {
  // activities: Activity[] = []
  activityRegistry = new Map<string, Activity>()
  loading = true
  loadingInitial = true
  submitting = false
  editMode = false
  activity: Activity | undefined = undefined

  constructor() {
    makeAutoObservable(this) //, { title: observable, setTitle: action })
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a: Activity, b: Activity) => Date.parse(a.date) - Date.parse(b.date)
    )
  }

  loadActivities = async () => {
    // this.setLoadingInitial(true)
    // var axiosRespData = agent.Activities.list()
    // console.log({ axiosRespData })
    try {
      await agent.Activities.list()
        .then((response) =>
          response.forEach((activity) => {
            this.activityRegistry.set(activity.id, activity)
          })
        )
        .finally(() => {
          console.log('set Loading false')
          this.setLoadingInitial(false)
        })
    } catch {
      console.log('error is occured')
      this.setLoadingInitial(false)
    }
  }

  setLoadingInitial = (state: boolean) => (this.loadingInitial = state)
  setSubmitting = (state: boolean) => (this.submitting = state)
  setEditMode = (state: boolean) => (this.editMode = state)
  setSelectedActivity = (activity: Activity | undefined) => {
    if (this.activityRegistry) this.activity = activity
    else this.handleCancelSelectActivity()
  }

  handleCreateOrEditActivity = (activity: Activity) => {
    this.setSubmitting(true)

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        // this.activities = [
        //   ...this.activities.filter((x) => x.id !== activity.id),
        //   activity,
        // ]
        this.activityRegistry.set(activity.id, activity)
        this.setSubmitting(false)
      })
    } else {
      const newActivity: Activity = { ...activity, id: uuid() }
      console.log(newActivity, uuid())

      agent.Activities.create(newActivity).then(() => {
        // this.activities = [...this.activities, newActivity]
        this.activityRegistry.set(activity.id, newActivity)
        this.setSubmitting(false)
      })
    }

    this.setEditMode(false)
    this.setSelectedActivity(activity)
  }

  handleDeleteActivity = (activity: Activity) => {
    this.setSubmitting(true)
    agent.Activities.delete(activity).then(() => {
      // this.activities = [...this.activities.filter((x) => x.id !== activity.id)]
      this.activityRegistry.delete(activity.id)
      this.setSubmitting(false)
    })
  }

  handleSelectActivity = (id: string) => {
    this.setSelectedActivity(this.activityRegistry.get(id))
  }

  handleCancelSelectActivity = () => {
    this.setSelectedActivity(undefined)
  }

  handleFormOpen = (id?: string) => {
    id ? this.handleSelectActivity(id) : this.handleCancelSelectActivity()
    this.setEditMode(true)
  }

  handleFormClose = () => {
    this.setEditMode(false)
  }
}
