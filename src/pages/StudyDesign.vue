<template>
  <q-page>
    <q-toolbar color="secondary">
      <q-toolbar-title>
        Study designer
      </q-toolbar-title>
      <q-btn class="q-mr-md" v-show="!this.studyDesign.published" color="warning" label="Save Draft" @click="saveProgress"/>
      <q-btn class="float-right q-mr-md" v-show="!this.studyDesign.published" color="negative" label="Publish" @click="publish"/>
      <q-btn class="float-right q-mr-md" v-show="this.studyDesign.published" color="blue" label="Published"/>
    </q-toolbar>

    <q-tabs color="secondary">
      <q-tab default slot="title" name="tab-gen" icon="subject" label="Generalities" />
      <q-tab slot="title" name="tab-crit" icon="fingerprint" label="Inclusion Criteria" />
      <q-tab slot="title" name="tab-tasks" icon="list" label="Tasks"/>
      <q-tab slot="title" name="tab-consent" icon="verified_user" label="Consent"/>

      <tab-pane-study-generalities name="tab-gen" :generalities="studyDesign.generalities"></tab-pane-study-generalities>
      <tab-pane-study-criteria name="tab-crit" :criteria="studyDesign.inclusionCriteria" ></tab-pane-study-criteria>
      <tab-pane-study-tasks name="tab-tasks" :tasks="studyDesign.tasks" ></tab-pane-study-tasks>
      <tab-pane-study-consent name="tab-consent" :consent="studyDesign.consent" :tasks="studyDesign.tasks" ></tab-pane-study-consent>
    </q-tabs>
  </q-page>
</template>

<script>
import TabPaneStudyGeneralities from '../components/TabPaneStudyGeneralities'
import TabPaneStudyCriteria from '../components/TabPaneStudyCriteria'
import TabPaneStudyTasks from '../components/TabPaneStudyTasks'
import TabPaneStudyConsent from '../components/TabPaneStudyConsent'
import API from '../data/API.js'

export default {
  name: 'StudyDesignLayout',
  props: ['studyKey'],
  components: {
    'tab-pane-study-generalities': TabPaneStudyGeneralities,
    'tab-pane-study-criteria': TabPaneStudyCriteria,
    'tab-pane-study-tasks': TabPaneStudyTasks,
    'tab-pane-study-consent': TabPaneStudyConsent
  },
  data () {
    return {
      studyDesign: {
        published: undefined,
        generalities: {
          title: '',
          description: '',
          startDate: undefined,
          endDate: undefined,
          principalInvestigators: [
            {
              name: '',
              contact: '',
              institution: ''
            }
          ],
          institutions: [
            {
              name: '',
              contact: '',
              dataAccess: ''
            }
          ]
        },
        inclusionCriteria: {
          minAge: undefined,
          maxAge: undefined,
          gender: [],
          lifestyle: { active: 'notrequired', smoker: 'notrequired' },
          criteriaQuestions: [
            {
              title: '',
              answer: ''
            }
          ],
          diseases: { },
          medications: { }
        },
        tasks: [],
        consent: {
          invitation: '',
          privacyPolicy: '',
          taskItems: [],
          extraItems: []
        }
      }
    }
  },
  async created () {
    if (this.studyKey) {
      try {
        this.studyDesign = await API.getStudyDescription(this.studyKey)
      } catch (err) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Cannot retrieve the study description. Please check the connection',
          icon: 'report_problem'
        })
      }
    }
  },
  methods: {
    async publish () {
      let timeStamp = new Date().toISOString()
      if (this.studyDesign.published) {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'This study has already been published.',
          icon: 'report_problem'
        })
      } else {
        if (this.studyKey) {
          try {
            this.studyDesign.published = timeStamp
            await API.updateDraftStudyDesign(this.studyKey, this.studyDesign)
            this.$q.notify({
              color: 'primary',
              position: 'bottom',
              message: 'Study has been published.',
              icon: 'done'
            })
          } catch (err) {
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message: 'Cannot publish. Please check the connection.',
              icon: 'report_problem'
            })
          }
        } else {
          try {
            this.studyDesign.published = timeStamp
            await API.publishStudyDesign(this.studyDesign)
            this.$q.notify({
              color: 'primary',
              position: 'bottom',
              message: 'Study has been published.',
              icon: 'done'
            })
          } catch (err) {
            this.$q.notify({
              color: 'negative',
              position: 'bottom',
              message: 'Cannot publish. Please check the connection.',
              icon: 'report_problem'
            })
          }
        }
      }
    },
    async saveProgress () {
      let timeStamp = new Date().toISOString()
      if (this.studyKey) {
        try {
          await API.updateDraftStudyDesign(this.studyKey, this.studyDesign)
          console.log('update --> saving progress')
          this.$q.notify({
            color: 'primary',
            position: 'bottom',
            message: 'Save Progress',
            icon: 'done'
          })
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'Cannot save progress. Please check the connection.',
            icon: 'report_problem'
          })
        }
      } else {
        try {
          this.studyDesign.created = timeStamp
          await API.saveDraftStudyDesign(this.studyDesign)
          console.log('NEW Save --> saving progress')
          this.$q.notify({
            color: 'primary',
            position: 'bottom',
            message: 'Save Progress',
            icon: 'done'
          })
        } catch (err) {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: 'Cannot save progress. Please check the connection.',
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>