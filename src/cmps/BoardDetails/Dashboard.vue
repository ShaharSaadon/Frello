<template>
  <section class="dashboard-container">
    <section class="dashboard-modal">


      <h2>dashboard</h2>
      {{ board.title }}

      <div class="members">
        members
        {{ board.members.length }}
      </div>
      <div class="tasks">
        groups
        {{ board.groups.length }}
      </div>
      <div class="tasks">
        sumOfTasks
        {{ sumOfTasks }}
      </div>

      <DoughnutChart :chartData="testData" />


      <BarChart :chartData="chartData" />

    </section>
  </section>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'Dashboard',
  data() {
    return {
      testData: {
        labels: ['Overdue', 'Due soon', 'No due date',],
        datasets: [
          {
            data: [],
            backgroundColor: ['red', 'yellow', 'lightBlue'],
          },
        ],
      },
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [],
          }
        ]
      }

    }
  },
  methods: {
    getTasksStatus() {
      const groups = this.board.groups
      const currentTime = Date.now()
      let overdueTasks = 0;
      let tasksDueToday = 0;
      let tasksWithNoDueDate = 0;
      groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const timeDiff = dueDate.getTime() - currentTime;

            if (timeDiff < 0) {
              overdueTasks++;
            } else if (timeDiff < 1000 * 60 * 60 * 24) {
              tasksDueToday++;
            }
          } else {
            tasksWithNoDueDate++;
          }
        })
      })
      console.log('[overdueTasks, tasksDueToday, tasksWithNoDueDate];:', overdueTasks, tasksDueToday, tasksWithNoDueDate)
      return [overdueTasks, tasksDueToday, tasksWithNoDueDate];
    },
    tasksPerGroup() {
      const groups = this.board.groups
      const groupStats = {
        groupsName: [],
        groupTasks: []
      }
      groups.forEach(group => {
        groupStats.groupsName.push(group.title)
        let counter = 0
        group.tasks.forEach(task => {
          counter++
        })
        groupStats.groupTasks.push(counter)
      })

      return groupStats
    }
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    sumOfTasks() {
      let counter = 0
      const groups = this.board.groups
      groups.forEach(group => {
        group.tasks.forEach(task => {
          counter++
        })
      })
      return counter
    },

  },
  mounted() {
    this.testData.datasets[0].data = this.getTasksStatus()
    const groupStats = this.tasksPerGroup()
    this.chartData.datasets[0].data = groupStats.groupTasks
    this.chartData.labels = groupStats.groupsName
  },
  created() {
  },
  components: { DoughnutChart, BarChart },

}
</script>

<style></style>