import * as api from '../../api/Sheet.api'
import useMutationWithConfirm from '../useMutationWithConfirm'
import { Grades } from '../../models'
import { useQuery } from 'react-query'

const queryKey = 'sheet'

const useSheet = (id: string) =>
  useQuery([queryKey, id], () => api.getSheet(id))
export default useSheet

interface Options {
  invalidate?: string | string[]
}

export const useSetMentorForSheet = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    (mentorId: string) => api.setMentor(sheetId, mentorId),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useAddUserToSheet = (sheetId: string, { invalidate }: Options) =>
  useMutationWithConfirm(
    (participantId: string) => api.addParticipant(sheetId, participantId),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useAddReviewer = (sheetId: string, { invalidate }: Options) =>
  useMutationWithConfirm(
    (mentorId: string) => api.addReviewer(sheetId, mentorId),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useDeleteUserFromSheet = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    (participantId: string) => api.deleteParticipant(sheetId, participantId),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const usePatchMentorGrade = (sheetId: string, { invalidate }: Options) =>
  useMutationWithConfirm(
    (grades: Grades) => api.patchMentorGrade(sheetId, grades),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const usePatchMentorReviewerGrade = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    ([mentorId, grades]: [string, Grades]) =>
      api.patchMentorReviewerGrade(sheetId, mentorId, grades),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetMentorGrade = (sheetId: string, { invalidate }: Options) =>
  useMutationWithConfirm(
    (grades: Grades) => api.setMentorGrade(sheetId, grades),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetMentorReviewerGrade = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    ([mentorId, grades]: [string, Grades]) =>
      api.setMentorReviewerGrade(sheetId, mentorId, grades),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetProjectForSheet = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    (projectId: string) => api.setProject(sheetId, projectId),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetReviewersForSheet = (
  sheetId: string,
  { invalidate }: Options,
) =>
  useMutationWithConfirm(
    (participantsIds: string[]) => api.setReviewers(sheetId, participantsIds),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useDeleteSheet = ({ invalidate }: Options) =>
  useMutationWithConfirm(api.deleteSheet, {
    invalidate: invalidate ?? queryKey,
  })

export const useCreateSheet = ({ invalidate }: Options) =>
  useMutationWithConfirm(api.createSheet, {
    invalidate: invalidate ?? queryKey,
  })
