import { useEffect } from "react"
import { useRouter } from "next/router"

export default function My404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/')
  }, [])

  return null
}