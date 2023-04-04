import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import { UseMutationResult, useMutation } from 'react-query'
import { CustomerComment } from 'types/customer-comment.types'

const postCreateComment = async (
  comment: CustomerComment
): Promise<GoogleSpreadsheetRow> => {
  const doc = new GoogleSpreadsheet(import.meta.env.VITE_GOOGLE_SHEETS_ID)

  await doc.useServiceAccountAuth({
    client_email: import.meta.env.VITE_CLIENT_EMAIL,
    private_key: import.meta.env.VITE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
  await doc.loadInfo()
  const sheets = doc.sheetsByIndex[0]
  const result = await sheets.addRow({
    id: comment.id,
    comment: comment.comment,
    createdAt: comment.createdAt
  })
  return result
}

export const usePostCreateCommentMutation = (): UseMutationResult<
  GoogleSpreadsheetRow,
  unknown,
  CustomerComment,
  unknown
> => {
  return useMutation((param) => postCreateComment(param))
}
