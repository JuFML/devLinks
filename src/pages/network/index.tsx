import { FormEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import Input from "../../components/Input"

import { db } from "../../services/firebaseConnection"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"


const Network = () => {
  const [github, setGithub] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    const docRef = doc(db, "network", "link")
    setDoc(docRef, {
      github,
      instagram,
      linkedin
    })
      .then(() => toast.success("Network links registered successfully!"))
      .catch((error) => {
        console.log("SOMETHING WENT WRONG WHILE REGISTERING THE NETWORKS LINK!", error)
        toast.success("SOMETHING WENT WRONG WHILE REGISTERING THE NETWORKS LINK!")
      })

  }

  const loadLinks = () => {
    const docRef = doc(db, "network", "link")
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setGithub(snapshot.data()?.github)
          setInstagram(snapshot.data()?.instagram)
          setLinkedin(snapshot.data()?.linkedin)
        }
      })
      .catch((error) => {
        toast.error("Unable to fetch Social Media link!")
        console.log("Unable to fetch Social Media link!:", error)
      })
  }

  useEffect(() => {
    loadLinks()
  }, [])

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">My Social Networks</h1>

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Github Link</label>
        <Input
          type="url"
          placeholder="Enter the github url..."
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Instagram link</label>
        <Input
          type="url"
          placeholder="Enter the instagram url..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Linkedin link</label>
        <Input
          type="url"
          placeholder="Enter the linkedin url..."
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Save Links
        </button>
      </form>

    </div>
  )
}

export default Network