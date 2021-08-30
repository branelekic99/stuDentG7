import React,{useState,useEffect,useRef} from 'react';
import CustomModal from "../components/CustomModal";
import NewsCreate from "../components/NewsCreate";
import {useSelector,useDispatch} from "react-redux";
import { Card,Tooltip } from 'antd';

import {clearSelectedItem, getNews, getNewsById,deleteNews} from "../redux-store/actions/news";
import default_img from "../static/default.jpg";
import { EditOutlined, DeleteOutlined,CaretRightOutlined,CaretLeftOutlined,PlusCircleOutlined } from '@ant-design/icons';
import CustomLoader from "../components/CustomLoader";
import NewsUpdate from "../components/NewsUpdate";
import Confirmation from "../components/Confirmation";

const { Meta } = Card;

const News = () => {
    const form_ref = useRef();
    const update_form_ref=  useRef();

    const dispatch = useDispatch();

    const [showLoader,setShowLoader] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
    const [deleteModal,setDeleteModal] = useState(false);

    const [deleteItem,setDeleteItem] = useState(null);

    const news_list = useSelector(state=>state.news.news_list);

    const offset = useSelector(state=>state.news.offset);
    const count = useSelector(state=>state.news.count);
    const re_fetch = useSelector(state=>state.news.reload);
    console.log("offset" ,offset);
    console.log("count", count);

    const fetch_data = async (offset=  0)=>{
        setShowLoader(true);
       await dispatch(getNews(offset));
       setShowLoader(false);
    };

    useEffect(()=>{
        fetch_data()
    },[]);

    useEffect(()=>{
        if(!re_fetch)
            return;
        fetch_data();
        handleClose();
        handleUpdateClose();
    },[re_fetch])

    const handleAddNews = ()=>{
        setShowModal(true);
    };
    const handleClose = ()=>{
        setShowModal(false);
    }
    const handleSubmit = (e)=>{
        form_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };
    const handleUpdateSubmit = (e)=>{
        update_form_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };
    const handleCardClick = async (card_item) =>{
        const id = card_item.id;
       await dispatch(getNewsById(id));
        setShowUpdateModal(true)
    };
    const handleUpdateClose = ()=>{
        setShowUpdateModal(false);
        dispatch(clearSelectedItem());
    }
    const handleDelete = async ()=>{
        if(deleteItem !== null){
            await dispatch(deleteNews(deleteItem.id));
        }
       handleDeleteModalClose();
    }
    const handleDeleteModalClose = ()=>{
        setDeleteModal(false);
        setDeleteItem(null);
    }
    const handleDeleteModalShow = item=>{
        setDeleteItem(item);
        setDeleteModal(true);
    }
    const handleNextClick = ()=>{
        fetch_data(offset + 10);
    }
    const handlePreviousClick = ()=>{
        fetch_data(offset - 10);
    }
    if(showLoader){
        return <CustomLoader />;
    }
    return (
        <div>
            <div style={{display:"flex"}}>
                <h1>News</h1>

                <Tooltip title={"Create news"} placement={"right"}>
                    <PlusCircleOutlined style={{ fontSize: '32px', color: '#08c' }} onClick={handleAddNews} />
                </Tooltip>
                <div style={{display:"flex"}}>
                    {offset > 10 && (
                        <Tooltip title={"Previous page"} placement={"right"}>
                            <CaretLeftOutlined style={{ fontSize: '32px', color: '#08c' }}
                                               onClick={handlePreviousClick}/>
                        </Tooltip>
                    )}
                    {offset + 10 < count && (
                        <Tooltip title={"Next page"} placement={"right"}>
                            <CaretRightOutlined style={{ fontSize: '32px', color: '#08c' }}
                                                onClick={handleNextClick}/>
                        </Tooltip>
                    )}
                </div>
            </div>
            <CustomModal show={showModal} handleClose={handleClose} title={"News create"} submit={handleSubmit}>
                <NewsCreate form_ref={form_ref}/>
            </CustomModal>
            <CustomModal show={showUpdateModal} handleClose={handleUpdateClose} title={"News Update"}
                         submit={handleUpdateSubmit}>
                <NewsUpdate form_ref={update_form_ref}/>
            </CustomModal>
            <Confirmation show={deleteModal} handleClose={handleDeleteModalClose} confirm={handleDelete}/>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {news_list.map(item=>(
                    <div style={{margin:"10px"}}>
                        <Card hoverable style={{width:240,height:400}}
                              cover={<img src={item.imageUrl?item.imageUrl:default_img} height={250}/>}
                              actions={[
                                  <Tooltip title={"Edit"} placement={"top"}>
                                    <EditOutlined key="edit" onClick={handleCardClick.bind(this,item)} />
                                  </Tooltip>,
                                  <Tooltip title={"Delete"} placement={"top"}>
                                    <DeleteOutlined key="delete" onClick={handleDeleteModalShow.bind(this,item)}/>
                                  </Tooltip>,
                              ]}>
                            <Meta title={item.title} description={item.content} />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
