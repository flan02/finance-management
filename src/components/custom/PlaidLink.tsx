/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link"
import { useRouter } from "next/navigation"
//import { StyledString } from "next/dist/build/swc"



const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState('')

  useEffect(
    () => {
      const getLinkToken = async () => { // * SERVER ACTION
        // const data = await createLinkToken(user) 
        // setToken(data?.linkToken)
      }
      getLinkToken()
    },
    []
  )

  // ? It helps us to avoid recalling the function every time the component re-renders
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      // await exchangePublicToken({ // * SERVER ACTION
      //  publicToken: public_token,
      //  user
      // }) 
      router.push('/')
    },
    [user]
  )


  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config) // TODO -> Hook provided by the library PLAID

  return (
    <>
      {
        variant === 'primary'
          ? <Button
            className="plaidlink-primary"
            onClick={() => open()}
            disabled={!ready}
          >
            Connect bank</Button>
          : variant === 'ghost'
            ? <Button>Connect bank</Button>
            : <Button>Connect bank</Button>
      }
    </>
  )
}

export default PlaidLink