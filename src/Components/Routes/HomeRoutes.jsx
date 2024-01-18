import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "../Widgets/Layout/Layout";
import ForgotPassword from '../Pages/ForgotPassword';
import Home from "../Pages/Home";

const About = lazy(() => import('../Widgets/About/About'));
const ProfileVideos = lazy(() => import('../Widgets/ProfileVideos/ProfileVideos'));
const ProfileImages = lazy(() => import('../Widgets/ProfileImages/ProfileImages'));
const ProfileReels = lazy(() => import('../Widgets/ProfileReels/ProfileReels'));
const ProfileFriends = lazy(() => import('../Widgets/ProfileFriends/ProfileFriends'));
const ProfilePosts = lazy(() => import('../Widgets/ProfilePosts/ProfilePosts'));
const Story = lazy(() => import('../Pages/Story'));
const CommentBox = lazy(() => import('../Widgets/CommentBox/CommentBox'));
const Messenger = lazy(() => import('../Pages/Messenger'));
const Community = lazy(() => import('../Pages/Community'));
const Post = lazy(() => import('../Pages/Post'));
const Profile = lazy(() => import('../Pages/Profile'));
const Admin = lazy(() => import('../Pages/Admin'));
const NotFound = lazy(() => import('../Pages/NotFound'));

const Loading = () => (
    <>
        <h1>Loading</h1>
    </>
)

export default function HomeRoutes() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route path=":userId/:postId" component={<CommentBox />} />
                        </Route>
                        <Route path="/:username" element={<Profile />}>
                            <Route path="" element={<ProfilePosts />} />
                            <Route path="about" element={<About />} />
                            <Route path="videos" element={<ProfileVideos />} />
                            <Route path="images" element={<ProfileImages />} />
                            <Route path="reels" element={<ProfileReels />} />
                            <Route path="friends" element={<ProfileFriends />} />
                        </Route>
                        <Route path="story/:id" element={<Story />} />
                        <Route path="messenger" element={<Messenger />} />
                        <Route path="community" element={<Community />} />
                        <Route path="post" element={<Post />} />
                        <Route path="admin" element={<Admin />} />
                        <Route path="forgotpassword" element={<ForgotPassword />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Suspense>
        </>
    )
}
