import { marked } from 'marked'

export default async (_, inject) => inject('marked', marked)
