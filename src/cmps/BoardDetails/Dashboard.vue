<template>
  <section class="dashboard-container" @click="$router.go(-1)">
    <section class="dashboard-modal" @click.stop>

      <header>
        <h1 class="title">Dashboard</h1>
        <h2 class="subtitle"> {{ board.title }} </h2>
      </header>
      <div class="stats">
        <div class="members">
          <div class="icon-holder">
          <span class="member-icon"></span>
        </div>
          <h2> {{ board.members.length }}</h2>
          Members
        </div>
        <div class="groups">
          <span class="member-icon"></span>
          <div class="box flex-columns">
          <h2> {{ board.groups.length }} </h2>
          groups
        </div>
        </div>
        <div class="tasks">
          <span class="member-icon"></span>
          <h2> {{ sumOfTasks }} </h2>
          sumOfTasks
        </div>

      </div>

      <div class="charts">

        <DoughnutChart :chartData="doughnutData" class="doughnut-chart" />
        <BarChart :chartData="lineData" class="bar-chart" />
        <LineChart :chartData="chartData" class="bar-chart" />
      </div>
    </section>
  </section>
</template>

<script>
import { DoughnutChart, LineChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'Dashboard',
  data() {
    return {
      doughnutData: {
        labels: ['Overdue', 'Due soon', 'No due date',],
        datasets: [
          {
            data: [],
            backgroundColor: ['red', 'yellow', 'lightBlue'],
          },
        ],
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Tasks per group',
            backgroundColor: '#f87979',
            data: [],
          }
        ]
      },
      lineData: {
        labels: [],
        datasets: [
          {
            label: 'Tasks per member',
            backgroundColor: '#f87979',
            data: []
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
      this.tasksPerMember()
      return groupStats
    },
    tasksPerMember() {
      const groups = this.board.groups

      const result = {};
      groups.forEach(group => {
        group.tasks.forEach(task => {
          task.members.forEach(memberId => {
            if (result[memberId]) {
              result[memberId]++;
            } else {
              result[memberId] = 1;
            }
          });
        });
      })


      Object.keys(result).forEach(memberId => {
        const member = this.members.find(m => m._id === memberId);
        if (member) {
          result[member.fullname] = result[memberId];
          delete result[memberId];
        } else {
          result[memberId] = result[memberId];
        }
      });

      const members = Object.entries(result).map(([key, value]) => key);
      const tasks = Object.entries(result).map(([key, value]) => value);
      const tasksStats = {
        members,
        tasks
      }

      return tasksStats
    },
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
    members() {
      return this.$store.getters.boardMembers
    }

  },
  mounted() {
    this.doughnutData.datasets[0].data = this.getTasksStatus()
    const groupStats = this.tasksPerGroup()
    this.chartData.datasets[0].data = groupStats.groupTasks
    this.chartData.labels = groupStats.groupsName
    const tasksStats = this.tasksPerMember()
    this.lineData.datasets[0].data = tasksStats.tasks
    this.lineData.labels = tasksStats.members


  },
  components: { DoughnutChart, BarChart, LineChart }

}
</script>
