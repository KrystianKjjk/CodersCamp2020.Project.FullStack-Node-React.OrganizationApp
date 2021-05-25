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

export const useSetMentorForSheet = ({invalidate}: Options) =>
  useMutationWithConfirm((vars: [string, string]) => api.setMentor(...vars), {
    invalidate: invalidate ?? queryKey,
  })

export const useAddUserToSheet = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, string]) => api.addParticipant(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useAddReviewer = ({invalidate}: Options) =>
  useMutationWithConfirm((vars: [string, string]) => api.addReviewer(...vars), {
    invalidate: invalidate ?? queryKey,
  })

export const useDeleteUserFromSheet = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, string]) => api.deleteParticipant(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const usePatchMentorGrade = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, Grades]) => api.patchMentorGrade(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const usePatchMentorReviewerGrade = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, string, Grades]) => api.patchMentorReviewerGrade(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetMentorGrade = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, Grades]) => api.setMentorGrade(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetMentorReviewerGrade = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, string, Grades]) => api.setMentorReviewerGrade(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useSetProject = ({invalidate}: Options) =>
  useMutationWithConfirm((vars: [string, string]) => api.setProject(...vars), {
    invalidate: invalidate ?? queryKey,
  })

export const useSetReviewers = ({invalidate}: Options) =>
  useMutationWithConfirm(
    (vars: [string, string[]]) => api.setReviewers(...vars),
    {
      invalidate: invalidate ?? queryKey,
    },
  )

export const useDeleteSheet = ({invalidate}: Options) =>
  useMutationWithConfirm(api.deleteSheet, {
    invalidate: invalidate ?? queryKey,
  })

export const useCreateSheet = ({invalidate}: Options) =>
  useMutationWithConfirm(api.createSheet, {
    invalidate: invalidate ?? queryKey,
  })
