import { Activity } from './../models/activity'
import { action, makeAutoObservable, makeObservable, observable } from 'mobx'
import { v4 as uuid, v4 } from 'uuid'

import agent from '../api/agent'

export default class ActivityStore {
  // activities: Activity[] = []
  activityRegistry = new Map<string, Activity>()
  loading = false
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
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date
        console.log('date', date)
        console.log('first activities[date]', activities[date])
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity]
        console.log('after activities[date]', activities[date])

        return activities
      }, {} as { [key: string]: Activity[] })
    )
  }

  loadActivities = async () => {
    // var axiosRespData = agent.Activities.list()
    // console.log({ axiosRespData })
    this.setLoadingInitial(true)
    try {
      await agent.Activities.list()
        .then((response) => {
          response.forEach((activity) => {
            this.setActivity(activity)
          })
        })
        .finally(() => {
          console.log('set Loading false')
          this.setLoadingInitial(false)
        })
    } catch {
      console.log('error is occured')
      this.setLoadingInitial(false)
    }
  }
  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0]
    this.activityRegistry.set(activity.id, activity)
  }

  private getActivity = (id: string) => {
    console.log('activity registry', this.activityRegistry)
    return this.activityRegistry.get(id)
  }
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    console.log('activity here', activity)
    this.setLoading(true)
    if (activity) {
      this.activity = activity
    } else {
      this.loadingInitial = true

      try {
        activity = await agent.Activities.details(id)
        this.setActivity(activity)
        this.activity = activity
        this.setLoadingInitial(false)
      } catch (error) {
        console.log(error)
        this.setLoadingInitial(false)
      }
    }
    this.setLoading(false)
    return activity
  }

  setLoadingInitial = (state: boolean) => (this.loadingInitial = state)
  setLoading = (state: boolean) => (this.loading = state)
  setSubmitting = (state: boolean) => (this.submitting = state)
  setEditMode = (state: boolean) => (this.editMode = state)
  setSelectedActivity = (activity: Activity | undefined) => {
    if (this.activityRegistry) this.activity = activity
    else this.handleCancelSelectActivity()
  }

  handleCreateOrEditActivity = (activity: Activity) => {
    this.setSubmitting(true)
    this.setLoading(true)

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        // this.activities = [
        //   ...this.activities.filter((x) => x.id !== activity.id),
        //   activity,
        // ]
        this.activityRegistry.set(activity.id, activity)
        this.setLoading(false)
      })
    } else {
      const newActivity: Activity = { ...activity, id: uuid() }
      console.log(newActivity, uuid())

      agent.Activities.create(newActivity).then(() => {
        // this.activities = [...this.activities, newActivity]
        this.activityRegistry.set(activity.id, newActivity)
      })
    }

    console.log('setsubmititng bug ', this.submitting)
    console.log('setting loading false')
    this.setSubmitting(false)
    this.setEditMode(false)
    this.setSelectedActivity(activity)
  }

  handleDeleteActivity = (activity: Activity) => {
    this.setSubmitting(true)
    this.setLoading(true)
    try {
      agent.Activities.delete(activity).then(() => {
        // this.activities = [...this.activities.filter((x) => x.id !== activity.id)]
        this.activityRegistry.delete(activity.id)
        this.setSubmitting(false)
        this.setLoading(false)
      })
    } catch (error) {
      console.log(error)
      this.setLoading(false)
    }
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
