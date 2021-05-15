import { useRef, useEffect } from 'react'

export default function useDidUpdateEffect(
  fn: Function,
  inputs: React.DependencyList,
) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}
