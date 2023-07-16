import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from './components/HomeLayout';
import Redirection from "./hoc/Redirection";
import RequireUnauth from "./hoc/RequireUnauth";
import RegistrationPage from "./pages/RegistrationPage";
import InvitationsPage from "./pages/InvitationsPage";
import NotFoundLink from "./pages/NotFoundLink";
import MyTasksPage from "./pages/MyTasksPage";
import AllTaskPage from "./pages/AllTasksPage";
import TasksLayout from "./components/TasksLayout";
import CreateTaskPage from "./pages/CreateTaskPage";
import TaskLayout from "./components/TaskLayout";
import TaskPage from "./pages/TaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import EndingTaskPage from "./pages/EndingTaskPage";
import WorkersPage from "./pages/WorkersPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import OnCheckTasksPage from "./pages/OnCheckTasksPage";
import WorkersLayout from "./components/WorkersLayout";
import CompleteTaskPage from "./pages/CompleteTaskPage";
import SendRecoveryPage from "./pages/SendRecoveryPage";
import RequireAuth from "./hoc/RequireAuth";
import ServiceLayout from "./components/ServiceLayout";
import BlocksPage from "./pages/BlocksPage";
import ResultsLayout from "./components/ResultsLayout";
import CreateResultPage from "./pages/CreateResultPage";
import ResultsPage from "./pages/ResultsPage";
import RecoveryPage from "./pages/RecoveryPage";
import RequireAdmin from "./hoc/RequireAdmin";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeLayout/>}>
                    <Route index element={<Redirection/>}/>
                    <Route path='login' element={
                        <RequireUnauth>
                            <LoginPage/>
                        </RequireUnauth>}/>
                    <Route path='send-recovery' element={
                        <RequireUnauth>
                            <SendRecoveryPage/>
                        </RequireUnauth>}/>
                    <Route path='change-password/:userID' element={
                        <RequireUnauth>
                            <RecoveryPage/>
                        </RequireUnauth>}/>
                    <Route path='registration/:link' element={
                        <RequireUnauth>
                            <RegistrationPage/>
                        </RequireUnauth>}/>
                    <Route path='registration/' element={
                            <NotFoundLink/>}/>
                    <Route path='invitations' element={<RequireAdmin><InvitationsPage/></RequireAdmin>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>

                <Route path='/tasks' element={<TasksLayout page='myTasks'/>}>
                    <Route path='my' element={
                        <RequireAuth>
                            <MyTasksPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/tasks' element={<TasksLayout page='onCheck'/>}>
                    <Route path='onCheck' element={
                        <RequireAuth>
                            <OnCheckTasksPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/tasks' element={<TasksLayout page='allTasks'/>}>
                    <Route path='all' element={
                        <RequireAuth>
                            <AllTaskPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/tasks' element={<TaskLayout />}>
                    <Route path='create' element={
                        <RequireAuth>
                            <CreateTaskPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/workers' element={<WorkersLayout page='workers'/>}>
                    <Route path='' element={
                        <RequireAuth>
                            <WorkersPage/>
                        </RequireAuth>
                    }
                    />
                </Route>
                <Route path='/departments' element={<ServiceLayout page='departments' />}>
                    <Route path='' element={
                        <RequireAuth>
                            <DepartmentsPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/blocks' element={<ServiceLayout page='blocks' />}>
                    <Route path='' element={
                        <RequireAuth>
                            <BlocksPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/results' element={<ResultsLayout />}>
                    <Route path='' element={
                        <RequireAuth>
                            <ResultsPage/>
                        </RequireAuth>
                    }
                    />
                    <Route path='create' element={
                        <RequireAuth>
                            <CreateResultPage/>
                        </RequireAuth>
                    }
                    />
                </Route>

                <Route path='/task' element={<TaskLayout />}>
                    <Route path=':taskId' element={
                        <RequireAuth>
                            <TaskPage/>
                        </RequireAuth>
                    }/>

                    <Route path=':taskId/edit' element={
                        <RequireAuth>
                            <EditTaskPage/>
                        </RequireAuth>
                    }/>

                    <Route path=':taskId/ending' element={
                        <RequireAuth>
                            <EndingTaskPage/>
                        </RequireAuth>
                    }/>

                    <Route path=':taskId/complete' element={
                        <RequireAuth>
                            <CompleteTaskPage/>
                        </RequireAuth>
                    }/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
