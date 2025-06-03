import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router"
import Input from "../../components/Input"

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email === "" || password === "") {
      toast.warning("Fill in all fields!")
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/admin", { replace: true }))
      .catch((error) => console.log("it went wrong", error))
  }


  return (
    <div className="flex w-full h-screen items-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      <form className="flex flex-col px-2 w-full max-w-xl" onSubmit={handleSubmit}>
        <Input placeholder="Enter your email..." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="*******" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer"
        >Acessar</button>
      </form>
    </div>
  )
}

export default Login