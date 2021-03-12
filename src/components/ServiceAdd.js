import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addItemRT } from "../redux-toolkit-store/servicesSlice"

function ServiceAdd() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ name: "", price: "" })
  const handleChange = (evt) => {
    const { name, value } = evt.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(addItemRT(formData.name, formData.price))
    setFormData({ name: "", price: "" })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} value={formData.name} />
      <input name="price" onChange={handleChange} value={formData.price} />
      <button type="submit">Save</button>
    </form>
  )
}

export default ServiceAdd
