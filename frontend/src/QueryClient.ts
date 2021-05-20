import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      notifyOnChangeProps: [
        'data',
        'error',
        'isFetching',
        'isLoading',
        'isError',
      ],
    },
  },
})

export default queryClient
