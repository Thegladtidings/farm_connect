import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent, Actor } from "@dfinity/agent"
import { idlFactory as backend_idl, canisterId as backend_id } from "../../declarations/farm_connect_backend"

let authClient
let backendActor

export const initAuth = async () => {
  authClient = await AuthClient.create()
}

export const loginWithInternetIdentity = async () => {
  if (!authClient) await initAuth()

  return new Promise((resolve, reject) => {
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity()
        const principal = identity.getPrincipal().toText()

       const agent = new HttpAgent({
  identity,
  host: import.meta.env.VITE_IC_REPLICA_HOST || "http://127.0.0.1:4943",
})

if (import.meta.env.DEV) {
  await agent.fetchRootKey()
}


        backendActor = Actor.createActor(backend_idl, {
          agent,
          canisterId: backend_id,
        })

        resolve({ principal, backendActor })
      },
      onError: reject,
    })
  })
}

export const logout = async () => {
  await authClient?.logout()
}

export const getBackendActor = () => backendActor
