import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "../Widgets/Layout/Layout";
import ForgotPassword from '../Pages/ForgotPassword';
import Home from "../Pages/Home";

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
                            <Route path="/:userId/:postId" component={<CommentBox />} />
                            <Route path="/:username" element={<Profile />} />
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
