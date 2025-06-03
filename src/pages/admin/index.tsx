import { FormEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import Input from "../../components/Input"

import { FiTrash } from "react-icons/fi"

import { db } from "../../services/firebaseConnection"
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { toast } from 'react-toastify';

interface LinkProps {
  id: string,
  name: string,
  url: string,
  textColor: string,
  bgColor: string,
}


const Admin = () => {
  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

  const [links, setLinks] = useState<LinkProps[]>([])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    if (nameInput === "" || urlInput === "") {
      toast.warning("Fill in all fields!")
      return
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      textColor: textColorInput,
      backgroundColor: backgroundColorInput
    }).then(() => {
      getLinks()
      setNameInput("")
      setUrlInput("")
      console.log("LINK REGISTERED SUCCESSFULLY")
    }).catch((error) => {
      toast.error("ERROR REGISTERING LINK")
      console.log("ERROR REGISTERING LINK: ", error)
    })
  }

  const getLinks = () => {
    getDocs(collection(db, "links"))
      .then((snapshot) => {
        const links: LinkProps[] = []
        snapshot?.forEach((doc) => {
          links.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            textColor: doc.data().textColor,
            bgColor: doc.data().backgroundColor,
          })
        })
        setLinks(links)
      })
      .catch((error) => {
        toast.error("SOMETHING WENT WRONG WHILE SEARCHING FOR LINKS")
        console.log("SOMETHING WENT WRONG WHILE SEARCHING FOR LINKS:", error)
      })
  }

  const handleDeleteLink = (id: string) => {
    const docRef = doc(db, "links", id)
    deleteDoc(docRef)
      .then(() => {
        toast.success('Link deleted successfully!')
        getLinks()
      })
      .catch((error) => {
        toast.error('Something went wrong while deleting the Link!')
        console.log("Something went wrong while deleting the Link:", error)
        getLinks()
      })
  }


  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Link name</label>
        <Input
          placeholder="Enter link name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Link url</label>
        <Input
          type="url"
          placeholder="Enter the link url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Link color</label>
            <Input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Link background</label>
            <Input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" &&
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-8 mt-8"
              style={{ backgroundColor: backgroundColorInput }}>
              <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        }

        <button type="submit" className="cursor-pointer mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Register
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        My Links
      </h2>

      {links.map(link => (
        <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bgColor, color: link.textColor }}>
          <p>{link.name}</p>
          <div>
            <button className="border border-dashed p-1 rounded bg-neutral-900">
              <FiTrash onClick={() => handleDeleteLink(link.id)} size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}


    </div>
  )
}

export default Admin