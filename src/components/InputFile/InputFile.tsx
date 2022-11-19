import React from "react"
import './InputFile.sass'

interface InputFileProps {
  img: FileList | null
  setImg: (fileList: FileList | null) => void
  todoImg: { title: string; url: string } | undefined | null
  closeTodoImg: () => void
}

/**
 * component of the input for uploading an image
 */
export const InputFile: React.FC<InputFileProps> = ({ img, setImg, todoImg, closeTodoImg }) => {
  let content = img && img[0]
    ? (
      <>
        <i className="bi bi-x-lg" onClick={() => setImg(null)}/>
        <label className="label">
          <img className="local-img" src={URL.createObjectURL(img[0])} alt=""/>
        </label>
      </>
    ) : (
      <label className="label">
        <i className="bi bi-file-earmark-plus"/>
        <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setImg(e.target.files)}/>
      </label>
    )


  return (
    <div className="input-file">
      {
        todoImg
          ? <div className="todo-img">
            <p className="todo-img__edit" onClick={closeTodoImg}>Удалить фото</p>
            <img className="todo-img__img" src={todoImg.url} width={100} alt="image"/>
            <p className="todo-img__name">{todoImg.title}</p>
          </div>
          : content
      }
    </div>
  )

}