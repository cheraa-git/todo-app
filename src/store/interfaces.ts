/**
 * The main interface of To-do
 * @property {string} id
 * @property {string} title
 * @property {boolean} done - to-do completion status
 * @property {string} description
 * @property {string} - completionDate - task completion date in string format ( String(new Date()) )
 * @property {image} image - to-do image data
 */
export interface Todo {
  readonly id: string
  title: string
  done: boolean
  description?: string
  completionDate?: string

  /**
   * @property {string} title - The name of the image, which is taken from the name of the file that the user sent
   * @property {string} url - The URL of the image by which it can be opened by http request
   * @property {string} storagePath - the path of the image to the storage (for example "images/image1.png")
   */
  image?: { title: string; url: string; storagePath: string } | null
}


/**
 * Payload type for the to-do editing function
 * @property {Todo} todo - to-do data
 * @property {flags} flags - additional flags to determine the presence of an image
 *
 */
export interface editTodoPayload {
  todo: {
    id: string
    title?: string
    done?: boolean
    description?: string
    completionDate?: string
    image?: { title: string; url: string; storagePath: string } | null
  }
  /**
   * @property {boolean} isImgDelete - if true, deleting the image from the firebase storage
   * @property {File} addImg - if existing, if existing, adding the new image to firebase storage
   */
  flags?: {
    isImgDelete?: boolean
    addImg?: File
  }


}

