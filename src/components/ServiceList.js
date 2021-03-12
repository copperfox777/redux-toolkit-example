import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchListRT, deleteItemRT } from "../redux-toolkit-store/servicesSlice"

function ServiceList(props) {
  const { items, fetchStatus } = useSelector((state) => state.service)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListRT())
  }, [dispatch])

  const handleRemove = (id) => {
    dispatch(deleteItemRT(id))
  }

  if (fetchStatus === "pending") {
    return <p>Loading...</p>
  }

  if (fetchStatus === "error") {
    return <p>Something went wrong try again</p>
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div style={{ width: 250, display: "inline-block" }}>
            {item.name} {item.price}{" "}
          </div>
          <button onClick={() => handleRemove(item.id)}>✕</button>
        </li>
      ))}
    </ul>
  )
}

export default ServiceList
