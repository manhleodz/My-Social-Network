import React from 'react'

export default function Intro({ owner, user, setNewStory, setChangeStory, updateStory, changeStory, newStory, story }) {
    return (
        <div className={` w-full bg-white  my-4 p-3  rounded-lg shadow-sm`}>
            <h1 className=' text-xl font-bold'>Giới thiệu</h1>
            <div className=' w-full flex flex-col items-center justify-center'>
                {changeStory ? (
                    <>
                        <textarea
                            id='story'
                            className=' w-full resize-none m-1 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                            onChange={(e) => setNewStory(e.target.value)}
                            defaultValue={story.replace(/@@newline@@/g, '\n')}
                            autoFocus
                        />
                    </>
                ) : (
                    <>
                        <pre className=" text-base font-normal break-words font-noto text-center">{newStory.length === 0 ? story.replace(/@@newline@@/g, '\n') : newStory.replace(/@@newline@@/g, '\n')}</pre>
                    </>
                )}
                {(user.id === owner.id) && (
                    <>
                        {changeStory ? (
                            <div className=' w-full flex justify-end items-center space-x-1'>
                                <button
                                    className='p-1.5 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md'
                                    onClick={() => {
                                        setNewStory("");
                                        setChangeStory(false)
                                    }}
                                >Hủy</button>
                                <button
                                    onClick={() => {
                                        if (newStory !== null) {
                                            updateStory(newStory);
                                        }
                                    }}
                                    className={`p-1.5 bg-gray-200 font-semibold rounded-md ${newStory.length > 0 ? ' cursor-pointer' : ' cursor-not-allowed text-gray-500'}`}
                                >Lưu</button>
                            </div>
                        ) : (
                            <>
                                <button className=' bg-gray-200 rounded-lg text-center hover:bg-gray-300 w-full p-2 font-semibold' onClick={() => setChangeStory(true)}>Chỉnh sửa tiểu sử</button>
                            </>
                        )}
                    </>
                )}
                {(owner.studyAt && owner.studyAt.length > 0) && (
                    <div className='space-x-2 w-full mt-2 flex items-center justify-start text-black'>
                        <svg width="64px" height="64px" viewBox="0 0 1024 1024" version="1.1" fill="#000000" className='w-8'>
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"><path d="M186.726 225.467h24.137v30.664h-24.137zM238.781 225.467h24.137v30.664h-24.137zM290.835 225.467h24.137v30.664h-24.137zM769.038
                                         507.97L753.1 495.888l67.698-89.305-61.547-60.298 13.996-14.287 74.132 72.628z" fill="#300604"></path>
                                <path d="M825.121 254.789l-29.979-29.979-49.848 49.848c-26.329-14.662-59.406-12.747-83.981 5.733L769.54 388.618c18.481-24.575 20.395-57.651 5.733-83.981l49.848-49.848z" fill="#B12800"></path>
                                <path d="M770.611 403.832L646.1 279.32l9.203-6.921c25.471-19.155 59.258-22.762 88.013-9.905l51.826-51.825 44.121 44.12-51.826 51.826c12.855 28.755 9.25 62.542-9.905 88.014l-6.921 9.203z
                                          m-93.356-121.641l90.485 90.484c10.011-19.703 9.792-43.429-1.204-63.174l-3.673-6.597 48.116-48.116-15.837-15.837-48.116 48.116-6.597-3.674c-19.745-10.995-43.47-11.213-63.174-1.202z" fill="#300604"></path>
                                <path d="M818.207 532.412c-9.194-23.568-32.099-40.274-58.921-40.274s-49.728 16.706-58.921 40.274h117.842z" fill="#B12800"></path>
                                <path d="M832.842 542.412H685.729l5.319-13.635c11.053-28.332 37.838-46.64 68.238-46.64s57.185 18.308 68.238 46.64l5.318 13.635z m-115.408-20h83.703c-9.896-12.645-25.122-20.274-41.852-20.274s-31.954 7.63-41.851 20.274z" fill="#300604"></path>
                                <path d="M408.339 259.437s-0.902 89.04 17.406 121.165 69.809 44.566 69.809 44.566l37.654-32.072s33.998-41.671 32.826-62.049c-1.172-20.378-28.123-120.25-28.123-120.25l-129.572 48.64z" fill="#FCE3C3"></path>
                                <path d="M487.185 425.586c-8.502 0-17.004-1.357-25.098-4.076a78.773 78.773 0 0 1-53.748-74.747v-87.326h16.737v87.326a62.054 62.054 0 0 0 42.34 58.881c12.749 4.277 26.789 4.277
                                         39.539 0a62.055 62.055 0 0 0 42.342-58.881v-87.326h16.737v87.326a78.774 78.774 0 0 1-53.751 74.747c-8.09 2.719-16.592 4.076-25.098 4.076z" fill="#300604"></path>
                                <path d="M487.185 428.258c-8.892 0-17.622-1.418-25.949-4.215a81.44 81.44 0 0 1-55.57-77.279v-89.999h22.083v89.999a59.387 59.387 0 0 0 40.518 56.348c12.2 4.093 25.637 
                                        4.091 37.839 0a59.387 59.387 0 0 0 40.52-56.348v-89.999h22.082v89.999a81.44 81.44 0 0 1-55.573 77.279c-8.324 2.797-17.055 4.215-25.95 4.215z m-76.174-166.15v84.655a76.102 
                                         76.102 0 0 0 51.927 72.213c7.778 2.612 15.936 3.938 24.247 3.938 8.315 0 16.473-1.325 24.248-3.938a76.101 76.101 0 0 0 51.93-72.213v-84.655H551.97v84.655a64.726 64.726 0 0 1-44.164 61.414c-13.297 4.462-27.942 4.462-41.239 0a64.727 64.727 0 0 1-44.162-61.414v-84.655h-11.394z" fill="#300604"></path><path
                                    d="M495.554 559.12H337.088v-74.926l103.991-91.113 6.018 1.166 1.678 1.272c5.677 4.473 11.948 7.878 18.639 10.126a62.026 62.026 0 0 0 19.772 3.231h8.369V559.12z" fill="#300604"></path>
                                <path d="M498.227 561.792H334.416v-78.811l105.887-92.773 7.913 1.533 2.174 1.648c5.469 4.309 11.47 7.569 17.875 9.722a59.34 59.34 0 0 0 18.92 3.092h11.042v155.589z 
                                        m-158.467-5.344h153.122V411.547h-5.697a64.695 64.695 0 0 1-20.622-3.369c-6.989-2.348-13.53-5.9-19.443-10.561l-1.143-0.866-4.123-0.799-102.094 89.453v71.043z" fill="#300604"></path>
                                <path d="M353.825 542.382h124.991V425.168a78.616 78.616 0 0 1-16.729-3.658 77.91 77.91 0 0 1-18.034-8.783l-90.228 79.056v50.599z" fill="#228E9D"></path>
                                <path d="M637.285 559.12H478.817V408.875h8.369a62.008 62.008 0 0 0 19.772-3.231c6.696-2.247 12.967-5.655 18.636-10.123l1.596-1.259 6.018-1.166 3.165 2.684 100.912 88.413v74.927z" fill="#300604"></path>
                                <path d="M639.958 561.792H476.144V406.203h11.041c6.445 0 12.812-1.04 18.922-3.092 6.403-2.149 12.403-5.409 17.833-9.688l2.105-1.66 7.914-1.533 4.143 3.513 101.857 89.239v78.81z m-158.469-5.344h153.125v-71.043L534.612 397.79l-2.154-1.826-4.123 0.799-1.087 0.857c-5.914 4.66-12.454 8.212-19.44 10.558a64.674 64.674 0 0 1-20.623 3.369h-5.696v144.901z" fill="#300604"></path><path d="M495.554 542.382h124.994v-50.599l-90.228-79.056a77.95 77.95 0 0 1-18.034 8.783 78.555 78.555 0 0 1-16.732 3.658v117.214z" fill="#228E9D"></path><path d="M404.101 293.629s-24.136-108.928 83.097-108.928 73.942 112.197 73.942 112.197-13.445-47.528-32.422-50.61c-20.908-3.397-47.605 65.808-124.617 47.341z" fill="#ED8F27"></path><path d="M561.141 306.518h-0.062a9.62 9.62 0 0 1-9.195-7.002c-6.969-24.537-18.615-42.743-24.707-43.733h-0.049c-2.776 0-11.047 7.569-16.531 12.589-19.65 17.986-52.536 48.092-108.739 34.612a9.62 9.62 0 0 1-7.149-7.273c-0.49-2.213-11.681-54.604 16.772-90.053 16.286-20.289 41.76-30.576 75.717-30.576 33.223 0 57.636 10.139 72.56 30.134 27.321 36.604 11.301 92.075 10.605 94.419a9.62 9.62 0 0 1-9.222 6.883zM412.505 285.57c42.44 7.646 66.97-14.797 85.101-31.392 11.297-10.342 21.058-19.263 32.654-17.388 9.583 1.557 18.182 9.224 26.14 23.356 0.018-14.443-2.633-30.828-12.101-43.478-11.1-14.829-30.311-22.349-57.101-22.349-27.833 0-48.26 7.866-60.712 23.38-11.707 14.584-14.639 33.79-15.038 47.332a128.928 128.928 0 0 0 1.057 20.539z" fill="#300604"></path><path d="M136.636 391.182H292.41v138.79H136.636z" fill="#B12800"></path><path d="M137.613 529.973v72.989h70.599v256.169H777.38V602.962h70.6v-72.989z" fill="#ED8F27"></path><path d="M777.38 869.616H208.212l-10.485-10.485V613.447h-60.114l-10.485-10.485v-72.989l10.485-10.485H847.98l10.485 10.485v72.989l-10.485 10.485h-60.114v245.684l-10.486 10.485z m-558.682-20.97h548.197V602.962l10.485-10.485h60.114v-52.019H148.098v52.019h60.114l10.485 10.485v245.684z" fill="#300604"></path><path d="M136.636 391.182H292.41v22.091H136.636zM136.636 441.033H292.41v22.091H136.636zM136.636 490.883H292.41v22.091H136.636z" fill="#300604"></path><path d="M137.613 529.973H847.98v77.666H137.613z" fill="#ED8F27"></path><path d="M847.98 618.454H137.613l-10.816-10.815v-77.666l10.816-10.815H847.98l10.816 10.815v77.666l-10.816 10.815z m-699.551-21.631h688.735v-56.035H148.429v56.035z" fill="#300604"></path></g>
                        </svg>
                        <h1 className=' text-[15px]'>Từng học tại <span className=' font-semibold'>{owner.studyAt}</span></h1>
                    </div>
                )}
                {(owner.address && owner.address.length > 0) && (
                    <div className='space-x-2 w-full mt-2 flex items-center justify-start text-black'>
                        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" className='w-8' fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <g> <path fill="#F9EBB2" d="M56,60c0,1.104-0.896,2-2,2H38V47c0-0.553-0.447-1-1-1H27c-0.553,0-1,0.447-1,1v15H10c-1.104,0-2-0.896-2-2 V31.411L32.009,7.403L56,31.394V60z"></path>
                                <polygon fill="#F76D57" points="14,6 18,6 18,12.601 14,16.593 "></polygon> <rect x="28" y="48" fill="#F9EBB2" width="8" height="14"></rect>
                                <path fill="#F76D57" d="M61,33c-0.276,0-0.602-0.036-0.782-0.217L32.716,5.281c-0.195-0.195-0.451-0.293-0.707-0.293 s-0.512,0.098-0.707,0.293L3.791,32.793C3.61,32.974,3.276,33,3,33c-0.553,0-1-0.447-1-1c0-0.276,0.016-0.622,0.197-0.803 L31.035,2.41c0,0,0.373-0.41,0.974-0.41s0.982,0.398,0.982,0.398l28.806,28.805C61.978,31.384,62,31.724,62,32 C62,32.552,61.553,33,61,33z"></path>
                                <g> <path fill="#394240" d="M63.211,29.789L34.438,1.015c0,0-0.937-1.015-2.43-1.015s-2.376,0.991-2.376,0.991L20,10.604V5 c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v13.589L0.783,29.783C0.24,30.326,0,31.172,0,32c0,1.656,1.343,3,3,3 c0.828,0,1.662-0.251,2.205-0.794L6,33.411V60c0,2.211,1.789,4,4,4h44c2.211,0,4-1.789,4-4V33.394l0.804,0.804 C59.347,34.739,60.172,35,61,35c1.657,0,3-1.343
                                        ,3-3C64,31.171,63.754,30.332,63.211,29.789z M14,6h4v6.601l-4,3.992V6z M36,62h-8 V48h8V62z M56,60c0,1.104-0.896,2-2,2H38V47c0-0.553-0.447-1-1-1H27c-0.553,0-1,0.447-1,1v15H10c-1.104,0-2-0.896-2-2V31.411 L32.009,7.403L56,31.394V60z M61,33c-0.276,0-0.602-0.036-0.782-0.217L32.716,5.281c-0.195-0.195-0.451-0.293-0.707-0.293 s-0.512,0.098-0.707,0.293L3.791,32.793C3.61,32.974,3.276,33,3,33c-0.553,0-1-0.447-1-1c0-0.276,0.016-0.622,0.197-0.803 L31.035,2.41c0,0,0.373-0.41,0.974-0.41s0.982,0.398,0.982,0.398l28.806,28.805C61.978,31.384,62,31.724,62,32 C62,32.552,61.553,33,61,33z"></path>
                                    <path fill="#394240" d="M23,32h-8c-0.553,0-1,0.447-1,1v8c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1v-8 C24,32.447,23.553,32,23,32z M22,40h-6v-6h6V40z"></path>
                                    <path fill="#394240" d="M41,42h8c0.553,0,1-0.447,1-1v-8c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v8 C40,41.553,40.447,42,41,42z M42,34h6v6h-6V34z"></path> </g>
                                <rect x="28" y="48" fill="#506C7F" width="8" height="14"></rect> <g> <rect x="16" y="34" fill="#45AAB8" width="6" height="6"></rect> <rect x="42" y="34" fill="#45AAB8" width="6" height="6"></rect> </g> </g> </g>
                        </svg>
                        <h1 className=' text-[15px]'>Sống tại <span className=' font-semibold'>{owner.address}</span></h1>
                    </div>
                )}
                {(owner.workAt && owner.workAt.length > 0) && (
                    <div className='space-x-2 w-full mt-2 flex items-center justify-start text-black'>
                        <svg width="64px" height="64px" viewBox="0 0 1024 1024" version="1.1" fill="#000000" className='w-8'>
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"><path d="M852.8 901.6h-688c-66.4 0-120-53.6-120-120V368.8c0-66.4 53.6-120 120-120h688c66.4 0 120 53.6 120 120v413.6c0 65.6-53.6 119.2-120 119.2z" fill="#D6AB7F"></path>
                                <path d="M146.4 687.2h730.4c35.2 0 68-11.2 95.2-31.2V368c0-66.4-53.6-120-120-120h-688c-66.4 0-120 53.6-120 120v283.2c29.6 23.2 64.8 36 102.4 36z" fill="#0D1014"></path>
                                <path d="M852.8 909.6h-688c-70.4 0-128-57.6-128-128V368.8c0-70.4 57.6-128 128-128h688c70.4 0 128 57.6 128 128v413.6c0 69.6-57.6 127.2-128 127.2z m-688-652.8c-61.6 0-112 50.4-112 112v413.6c0 61.6
                                 50.4 112 112 112h688c61.6 0 112-50.4 112-112V368.8c0-61.6-50.4-112-112-112h-688z" fill="#6A576D"></path><path d="M508.8 729.6c-22.4 0-40-17.6-40-40v-45.6h80v45.6c0 21.6-17.6 40-40 40z" fill="#FFFFFF"></path>
                                <path d="M508.8 737.6c-26.4 0-48-21.6-48-48V640c0-4.8 3.2-8 8-8h80c4.8 0 8 3.2 8 8v49.6c0 26.4-21.6 48-48 48z m-32-90.4v41.6c0 17.6 14.4 32 32 32s32-14.4 32-32v-41.6h-64z" fill="#6A576D"></path>
                                <path d="M247.2 214.4H148.8c-62.4 0-113.6 50.4-114.4 113.6L32 523.2c-0.8 64 50.4 116 114.4 116h730.4c64 0 115.2-52 114.4-116l-2.4-196c-0.8-62.4-52-113.6-114.4-113.6H247.2" fill="#938993"></path>
                                <path d="M877.6 647.2H146.4c-32.8 0-64-12.8-87.2-36.8C36 587.2 24 556 24 523.2l2.4-196c0.8-67.2 56-120.8 122.4-120.8h726.4c67.2 0 121.6 54.4 122.4 120.8l2.4 196c0 32.8-12 64-35.2 88-23.2 23.2-54.4 
                                 36-87.2 36zM148.8 222.4c-58.4 0-105.6 47.2-106.4 105.6L40 523.2c0 28.8 10.4 56 30.4 76 20 20.8 47.2 32 76 32h730.4c28.8 0 56-11.2 76-32s31.2-47.2 30.4-76l-2.4-196c-0.8-58.4-48.8-105.6-106.4-105.6H148.8z" fill="#6A576D"></path>
                                <path d="M509.6 505.6h-1.6c-37.6 0-68 31.2-68 67.2v70.4h137.6v-70.4c0.8-36-29.6-67.2-68-67.2z" fill="#EC7BB0"></path><path d="M577.6 647.2H440c-2.4 0-4-0.8-5.6-2.4-1.6-1.6-2.4-3.2-2.4-5.6l0.8-66.4c0-41.6 34.4-75.2 
                                 76-75.2h1.6c41.6 0 76 33.6 76 75.2l-0.8 66.4c0 4.8-3.2 8-8 8z m-129.6-16h121.6v-58.4c0-32.8-27.2-59.2-60-59.2h-1.6c-32.8 0-60 26.4-60 59.2v58.4zM680.8 222.4c-4.8 0-8-3.2-8-8 0-26.4-6.4-45.6-19.2-58.4-25.6-25.6-76.8-25.6-136-25.6h-17.6c-59.2 0-110.4 0-136 25.6-12.8 12.8-19.2 32-19.2 58.4 0 4.8-3.2 8-8 8s-8-3.2-8-8c0-31.2 8-53.6 24-69.6 30.4-30.4 84-30.4 147.2-30.4h17.6c62.4 0 116.8 0 147.2 30.4 16 16 24 38.4 24 69.6 0 4-4 8-8 8z" fill="#6A576D"></path></g>
                        </svg>
                        <h1 className=' text-[15px]'>Việc làm <span className=' font-semibold'>{owner.workAt}</span></h1>
                    </div>
                )}
            </div>
        </div>
    )
}
