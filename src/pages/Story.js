// react
import { useEffect, useState } from "react"
// router
import { useParams } from "react-router-dom"

const Story = () => {
  const [chapter, setChapter] = useState()
  const [title, setTitle] = useState()
  const [chaptersLength, setChaptersLength] = useState()

  // get url params
  const params = useParams()

  // get chapter
  useEffect(()=>{
    fetch('https://ashot2003.github.io/kbooks/api/books.json')
      .then(res => { return res.json() })
      .then(data => {
        setChaptersLength(data[params.id].about.contents.length)
        setTitle(data[params.id].about.contents[params.chapter-1])
        setChapter(data[params.id].text[params.chapter-1])
      })
  }, [])

  return (
    <main className="story wrapper">
      <h1>{ title }</h1>
      <div className="divider" />
      <div className="text">{
        chapter && chapter.split("\n").map((paragraph, i) => (
          <p key={i}>{ paragraph }</p>
        ))}
      </div>
      <nav>
        {
          params.chapter < chaptersLength &&
            <a className="btn" href={"/kbooks/#/story/" + params.id + "/" + (parseInt(params.chapter)+1) }>Следующая глава</a>
        }
        {
          params.chapter > 1 &&
            <a className="btn pale" href={"/kbooks/#/story/" + params.id + "/" + (parseInt(params.chapter)-1) }>Предыдущая глава</a>
        }
      </nav>
    </main>
  )
}
 
export default Story