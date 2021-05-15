import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
