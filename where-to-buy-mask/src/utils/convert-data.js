export let tableData = {
  mon: {
    morning: false,
    afternoon: false,
    evening: false
  },
  tue: {
    morning: false,
    afternoon: false,
    evening: false
  },
  wed: {
    morning: false,
    afternoon: false,
    evening: false
  },
  thu: {
    morning: false,
    afternoon: false,
    evening: false
  },
  fri: {
    morning: false,
    afternoon: false,
    evening: false
  },
  sat: {
    morning: false,
    afternoon: false,
    evening: false
  },
  sun: {
    morning: false,
    afternoon: false,
    evening: false
  }
}

const dayMap = {
  星期一: 'mon',
  星期二: 'tue',
  星期三: 'wed',
  星期四: 'thu',
  星期五: 'fri',
  星期六: 'sat',
  星期日: 'sun'
}

const timeMap = {
  上午: 'morning',
  下午: 'afternoon',
  晚上: 'evening'
}

export function convert (rawData) {
  const data = rawData.split('、')
  data.forEach(str => {
    if (str.trim().length === 0) return false
    const day = dayMap[str.slice(0, 3)]
    const time = timeMap[str.slice(3, 5)]
    const available = str.slice(5, 7)
    tableData[day][time] = (available === '看診')
  })
  return tableData
}

export function tableTemplate (tableData) {
  return `
    <table class="popup__table">
      <thead>
        <tr>
          <th scope="col">＃</th>
          <th scope="col">一</th>
          <th scope="col">二</th>
          <th scope="col">三</th>
          <th scope="col">四</th>
          <th scope="col">五</th>
          <th scope="col">六</th>
          <th scope="col">日</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">早上</th>
          <td>${tableData.mon.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.tue.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.wed.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.thu.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.fri.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sat.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sun.morning ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
        </tr>
        <tr>
          <th scope="row">下午</th>
          <td>${tableData.mon.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.tue.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.wed.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.thu.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.fri.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sat.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sun.afternoon ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
        </tr>
        <tr>
          <th scope="row">晚上</th>
          <td>${tableData.mon.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.tue.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.wed.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.thu.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.fri.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sat.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
          <td>${tableData.sun.evening ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'}</td>
        </tr>
      </tbody>
    </table>
  `
}

export default {
  convert,
  tableTemplate,
  tableData
}
