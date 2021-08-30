import React, {useState, useRef, useEffect} from 'react';
import {Tooltip,Image} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {PlusCircleOutlined} from "@ant-design/icons";

import CustomModal from "../components/CustomModal";
import AddImage from "../components/AddImage";
import Confirmation from "../components/Confirmation";
import CustomLoader from "../components/CustomLoader";
import {deleteImage, getGallery} from "../redux-store/actions/gallery";

const Gallery = () => {
    const dispatch = useDispatch();

    const form_ref = useRef();

    const [loader,setLoader] = useState(false);

    const [showModal,setShowModal] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [deleteItem,setDeleteItem] = useState(null);

    const images = useSelector(state=>state.gallery.images);
    const re_fetch = useSelector(state=>state.gallery.reload);

    const fetchImages = async ()=>{
        setLoader(true);
        await dispatch(getGallery());
        setLoader(false);
    }
    useEffect(()=>{
        fetchImages();
    },[]);

    useEffect(()=>{
        if(!re_fetch)
            return;
        fetchImages();
        handleClose();
    },[re_fetch]);

    const handleClose = ()=>{
        setShowModal(false);
    };
    const handleSubmit = ()=>{
        form_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    }
    const handleAddImage = ()=>{
        setShowModal(true)
    }
    const handleDelete = () =>{
        if(deleteItem !== null){
            dispatch(deleteImage(deleteItem.id));
        }
        handleDeleteModalClose();
    }
    const handleDeleteModal = item =>{
        console.log(item)
        setDeleteItem(item);
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = () =>{
        setShowDeleteModal(false);
        setDeleteItem(null);
    }
    if(loader){
        return <CustomLoader />;
    }
    return (
        <div>
            Gallery
            <Tooltip title={"Add image"} placement={"right"}>
                <PlusCircleOutlined style={{ fontSize: '32px', color: '#08c' }} onClick={handleAddImage} />
            </Tooltip>
            <CustomModal show={showModal} handleClose={handleClose} title={"News create"} submit={handleSubmit}>
                <AddImage form_ref={form_ref}/>
            </CustomModal>
            <Confirmation show={showDeleteModal} handleClose={handleDeleteModalClose} confirm={handleDelete}/>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                <Image.PreviewGroup>
                    {images.map(item=><div style={{display:"flex",flexDirection:"column"}}>
                        <Image width={200} src={item.imageUrl}/>
                        <button onClick={handleDeleteModal.bind(this,item)}>Delete</button>
                    </div>)}
                </Image.PreviewGroup>
            </div>
        </div>
    );
};

export default Gallery;
