import React, { useState } from 'react';
import './Story.scss'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FastAverageColor } from 'fast-average-color';
import LoadingStory from './LoadingStory';

export default function Story() {

  const user = useSelector(state => state.authentication.user);
  const [page, setPage] = useState(1);
  const stories = useSelector(state => state.stories.stories);

  const navigate = useNavigate();

  const fac = new FastAverageColor();

  const getBackgroundColor = async (link) => {
    fac.getColorAsync(link)
      .then(color => {
        return color.rgb;
      })
      .catch(e => {
        console.log(e);
      });
  }

  if (!user) return null;

  var length = Math.floor((stories.length + 1) / 5);

  if ((stories.length + 1) / 3 > length) {
    length = length + 1;
  }

  return (
    <div className=' relative flex justify-between items-center w-9/12 max-md:w-full'>
      {page !== 1 && (
        <button
          onClick={() => {
            setPage(page => page = page - 1);
            document.getElementById('container').scrollLeft -= 820;
          }}
          className=' absolute left-0 z-10 p-2 w-14 h-14 flex justify-center items-center active:scale-105 rounded-full bg-white ml-5'
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 320 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </button>
      )}
      <div className=' flex items-center overflow-x-hidden overflow-y-hidden transform relative w-full scroll-smooth' id='container'>
        <div className=' flex flex-row items-center justify-start space-x-1 w-full scroll-smooth' key={234} style={{ width: `${stories.length === 0 ? `${430}px` : `${(stories.length + 0.5) * 185}px`}` }}>
          <div
            onMouseEnter={() => {
              document.getElementById('new').style.display = 'block';
            }}
            onMouseLeave={() => {
              document.getElementById('new').style.display = 'none';
            }}
            className=' w-40 h-64 relative rounded-lg shadow-lg border-slate-300 border cursor-pointer'
            style={{
              backgroundImage: `url(${user.avatar})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '160px',
            }}
          >
            <div className=' absolute bottom-0 h-12 flex flex-col justify-end items-center bg-white w-full rounded-b-lg'>
              <div className=' p-1 rounded-full bg-white absolute bottom-6'>
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" className=' fill-blue-600'>
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </div>
              <h1 className=' text-sm font-semibold'>Tạo tin</h1>
            </div>
            <div id='new' className='absolute w-40 h-64 rounded-lg hidden' style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}></div>
          </div>
          {stories.length === 0 ? (
            <LoadingStory />
          ) : (
            <>
              {stories.map((story, key) => (
                <>
                  <div
                    id={`story_${key}`}

                    onClick={(e) => navigate(`story/${story.id}`, { state: { stories: stories } })}
                    onMouseEnter={() => {
                      document.getElementById(`reel-${story.id}`).style.display = 'block';
                      document.getElementById(`content_${key}`).style.transform = 'scale(1.06)'
                    }}
                    onMouseLeave={() => {
                      document.getElementById(`reel-${story.id}`).style.display = 'none';
                      document.getElementById(`content_${key}`).style.transform = 'scale(1.01)'
                    }}
                    style={{ backgroundColor: "gray" }}
                    className=' w-40 h-64 p-1 flex justify-center items-center relative rounded-lg shadow-lg border-none cursor-pointer overflow-hidden' key={key}
                  >
                    {story.link.includes("mp4") ? (
                      <>
                        <ReactPlayer
                          id={`content_${key}`}
                          className='react-player transition-all'
                          url={story.link}
                          width='100%'
                          height='100%'
                          style={{ transitionDuration: "500ms" }}
                        />
                      </>
                    ) : (
                      <>
                        <img id={`content_${key}`} alt={`${story.id}`} src={`${story.link}`} className='w-full h-full object-cover block transition-all duration-500' />
                      </>
                    )}
                    <div className='absolute top-1 left-1 p-1 bg-blue-600 rounded-full'>
                      <img alt='avatar' src={`${story.User.avatar}`} className=' w-10 h-10 object-cover rounded-full' />
                    </div>
                    <div id={`reel-${story.id}`} className='absolute w-40 h-64 rounded-lg hidden' style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                    </div>
                    <h1 className=' absolute text-white text-xs bottom-3 left-2 font-bold'>{story.User.nickname}</h1>
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>
      <div></div>
      {page !== length && (<button
        onClick={() => {
          setPage(page => page = page + 1);
          document.getElementById('container').scrollLeft += 820;
        }}
        className=' absolute right-5 z-10 p-2 w-14 h-14 flex justify-center items-center active:scale-105 rounded-full bg-white'
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 320 512">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </button>)}
    </div>
  )
}
