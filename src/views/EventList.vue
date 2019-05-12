<template>
  <div>
    <h1>Events for {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
    </template>
    <template v-if="page < lastPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '../components/EventCard'
// import EventCard from '@/components/EventCard'
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event','user']),
    lastPage() {
      return this.event.totalEventsCount
        ? Math.ceil(this.event.totalEventsCount / this.perPage)
        : 1
    }
  }
}
</script>

<style scoped></style>
