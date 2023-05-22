import { update } from "lodash"
import { useEffect, useState } from "react"
import { createUser, getCategories, uploadImage } from "../Actions/UserActions"

export default function UserForm(){
    const [sources,setSource] = useState("")
    const [categories, setCategories] = useState([])
    const [User, setUser] = useState({
        "id": 1,
        "email": "",
        "password": "",
        "name": "",
        "role": "",
        "avarta": [
            "https://picsum.photos/640/640?r=801"
        ]
    })

    const handleInputChange = (e) => {
        console.log(e.target.name)
        const {name, value} = e.target
        setUser(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }
    const onFieldUploadingHandler = (e) =>{
        console.log(e.target.files[0])
        setSource(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handle submit")
        const formData = new FormData()
        formData.append("file", sources)
        uploadImage(formData)
        .then(response => {
            User.avarta = [response.data.location]
            console.log(User)
            createUser(User)
            .then( resp  => {
                console.log(resp)
                alert("sucess")
            })
       
                        
    })

    }
    useEffect(() => {
        getCategories()
        .then(response => setCategories(response))
    }, [])
    return(
        <form 
            className="mt-5 w-50 m-auto"
            onSubmit={handleSubmit}
        >
            <h1 className="text-center">Register</h1>
            <div className="mb-3">
                <label htmlFor="id" class="form-label">User ID</label>
                <input 
                    type="number" 
                    class="form-control"
                    placeholder="Id"
                    name="Id"
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">User Email</label>
                <input 
                    type="email" 
                    className="form-control"
                    placeholder="...gmail.com"
                    name="Email"
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Password" class="form-label">Password</label>
                <textarea 
                    type="password"
                    class="form-control" 
                    // rows="5"
                    name="Password"
                    placeholder="**********"
                    onChange={handleInputChange}
                >

                </textarea>
            </div>

            <select 
                class="form-select"
                onChange={handleInputChange}
                name="role"
            >
                <option selected>Choose Category</option>
                {
                    categories.map(cat => (
                        <option value={cat.id}>{cat.name}</option>
                    ))
                }
            </select>
            <div className="mb-3">
                <label htmlFor="Avarta" class="form-label">Upload your avarta</label>
                <input 
                    type="file" 
                    className="form-control"
                    name="Avarta"
                    onChange={onFieldUploadingHandler}
                />
            </div>
            <div className="mb-3">
                <img className="w-50"
                src={sources && URL.createObjectURL(sources)} alt="" />


            </div>

            <button 
                type="submit" 
                class="btn btn-primary mt-4 w-100"
            >Register</button>
        </form>
    )
}