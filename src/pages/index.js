/* global BACKEND_URL */
// This is Link API
// import Header from '../components/Header'

const Index = () => (
  <div>
    <p className='hello'>Hello Next.js { BACKEND_URL }</p>
    <style jsx>{`
      .hello {
        font: 15px Helvetica, Arial, sans-serif;
        background: #eee;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
      }
      .hello:hover {
        background: #ccc;
      }
    `}</style>
  </div>
)

export default Index
