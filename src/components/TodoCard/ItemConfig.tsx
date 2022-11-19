import './TodoCard.sass'
import React, { useState } from "react"
import { editTodoPayload, Todo } from "../../store/interfaces"
import { useAppDispatch } from "../../store/store"
import { editTodo } from "../../store/actions/todoActions"
import { InputFile } from "../InputFile/InputFile"


interface ItemConfigProps {
  currentTodo: Todo
  onClose: () => void
}

/**
 * Configuration window for each task
 */
export const ItemConfig: React.FC<ItemConfigProps> = ({ currentTodo, onClose }) => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState(currentTodo.title)
  const [description, setDescription] = useState(currentTodo.description)
  const [completionDate, setCompletionDate] = useState(currentTodo.completionDate || '')
  const [localImage, setLocalImage] = useState<FileList | null>(null)
  const [todoImage, setTodoImage] = useState<{ title: string; url: string } | undefined | null>(currentTodo.image)
  const onSaveHandler = () => {
    if (!title) return alert('Введите название')

    const sendData: editTodoPayload = {
      todo: {
        id: currentTodo.id,
        done: currentTodo.done,
        title,
        completionDate,
        description,
        image: currentTodo.image
      },
      flags: {}
    }
    if (sendData.flags) {

      if (!todoImage && currentTodo.image) {
        sendData.flags.isImgDelete = true
      }
      if (!currentTodo.image && localImage && localImage[0]) {
        sendData.flags.addImg = localImage[0]
      }
      if (currentTodo.image && localImage && localImage[0]) {
        sendData.flags.addImg = localImage[0]
        sendData.flags.isImgDelete = true
      }
    }

    dispatch(editTodo(sendData))
    onClose()
  }


  return (
    <div className="item-config">

      <p>Заголовок</p>
      <div className="item-config__input">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>

      <p>Описание</p>
      <div className="item-config__input">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <i className="bi bi-x" onClick={() => setDescription('')}/>
      </div>

      <p>Дата завершения</p>
      <div className="item-config__input">
        <input type="datetime-local" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)}/>
        <i className="bi bi-x" onClick={() => setCompletionDate('')}/>
      </div>

      <p>Фото</p>

      <InputFile img={localImage} setImg={setLocalImage} todoImg={todoImage}
                 closeTodoImg={() => setTodoImage(undefined)}/>

      <div className="item-config__footer">
        <button onClick={onClose}>Отмена</button>
        <button onClick={onSaveHandler}>Сохранить</button>
      </div>
    </div>
  )
}