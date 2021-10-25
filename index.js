import alfy from 'alfy'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN
})
const databaseId = process.env.NOTION_INBOX_DB_ID
const taskName = alfy.input

async function addItem(text) {
  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
  } catch (error) {
    throw new Error(error.body)
  }
}

addItem(taskName)
