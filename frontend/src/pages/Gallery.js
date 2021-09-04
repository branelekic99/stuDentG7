import React, {useState, useRef, useEffect} from 'react';
import {Tooltip, Image} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {PlusCircleOutlined} from "@ant-design/icons";

import CustomModal from "../components/CustomModal";
import AddImage from "../components/AddImage";
import Confirmation from "../components/Confirmation";
import CustomLoader from "../components/CustomLoader";
import {deleteImage, getGallery} from "../redux-store/actions/gallery";
import {FaEdit, FaPlus, FaTrash} from "react-icons/all";
import default_img from "../static/default.jpg";

const Gallery = () => {
    const dispatch = useDispatch();

    const form_ref = useRef();

    const [loader, setLoader] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const images = useSelector(state => state.gallery.images);
    const re_fetch = useSelector(state => state.gallery.reload);

    const fetchImages = async () => {
        setLoader(true);
        await dispatch(getGallery());
        setLoader(false);
    }
    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if (!re_fetch)
            return;
        fetchImages();
        handleClose();
    }, [re_fetch]);

    const handleClose = () => {
        setShowModal(false);
    };
    const handleSubmit = () => {
        form_ref.current.dispatchEvent(
            new Event("submit", {cancelable: true, bubbles: true})
        );
    }
    const handleAddImage = () => {
        setShowModal(true)
    }
    const handleDelete = () => {
        if (deleteItem !== null) {
            dispatch(deleteImage(deleteItem.id));
        }
        handleDeleteModalClose();
    }
    const handleDeleteModal = item => {
        console.log(item)
        setDeleteItem(item);
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setDeleteItem(null);
    }
    if (loader) {
        return <CustomLoader/>;
    }
    return (
        <>
            <div className={"container-fluid"}>
                <div className={"row pt-3 pb-2 sv-border-bottom"}>
                    <div className={"col-12 col-md-12 col-lg-3 col-xl-3"}>
                            <button className={"btn btn-primary w-100"} onClick={handleAddImage}> Add new
                                image
                            </button>
                    </div>
                </div>

                <div className={"row pt-3"}>

                    <Image.PreviewGroup>
                        {images.map((item) => (
                                <div className={"col-12 col-md-12 col-lg-3 col-xl-3 pt-3 pb-3"}>
                                    <div className="card">
                                        <Image className={"sv-image-card"} src={item.imageUrl}/>
                                        <div className={"card-footer"}>
                                            <div className={"row"}>
                                                <div className={"col-12 col-md-12 col-lg-12 col-xl-12"}>
                                                    <button className="btn btn-primary w-100"
                                                            onClick={handleDeleteModal.bind(this, item)}> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </Image.PreviewGroup>
                </div>
            </div>

            <CustomModal show={showModal} handleClose={handleClose} title={"News create"} submit={handleSubmit}>
                <AddImage form_ref={form_ref}/>
            </CustomModal>
            <Confirmation show={showDeleteModal} handleClose={handleDeleteModalClose} confirm={handleDelete}/>
        </>
    );
};

export default Gallery;
