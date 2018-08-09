'use strict;'

const buildGDocsURL = (key) => (
  `https://spreadsheets.google.com/feeds/list/${key}/od6/public/values?alt=json`
)

const getGDocsData = (spreadsheetId, page = 0, limit = 50) => (
  fetch(buildGDocsURL(spreadsheetId))
    .then(res => res.json())
    .then(data => {
      const entries = Object.values(data.feed.entry)
      const [firstRow, ...rows] = entries

      const keyDescriptorsKeys = Object.keys(firstRow)
        .filter(key => key.match(/gsx\$/))

      const keys = keyDescriptorsKeys.reduce((acc, key) => {
        return Object.assign(acc, {
          [key]: firstRow[key]['$t'] || 'id'
        })
      }, {})

      return rows.slice(page * limit, page * limit + limit).map(entry => (
        keyDescriptorsKeys.reduce((acc, key) => {
          if (!entry[key]) {
            return acc
          }

          return Object.assign(acc, {
            [keys[key]]: entry[key]['$t']
          })
        }, {})
      ))
    })
)

module.exports = getGDocsData
