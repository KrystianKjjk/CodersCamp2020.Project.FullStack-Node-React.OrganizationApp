import React, {useEffect, useState} from 'react';
import { Backdrop, CssBaseline, Fade, Modal } from "@material-ui/core";

import ReusableTable from "../ReusableTable";
import SearchInput from "../SearchInput";

import styles from './FindModal.module.css';

export interface FindModalProps<T> {
    onRowSelection: any,
    dataPromise: Promise<T[]>,
    columns: {field: string, width:number, fieldName?: string}[],
}

const FindModal = <T extends unknown>(props: FindModalProps<T>) => {

    const [open, setOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(true);
    const [search, setSearch] = useState('');
    const [data, setData] = useState<T[]>([]);
    const [filteredData, setFilteredData] = useState<T[]>([]);

    useEffect(() => {
        props.dataPromise
            .then((res: T[]) => {
                setData([...res]);
                setFilteredData([...res]);
                handleOpen();
            })
            .catch(err => {
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        const result = data.filter((mentor: any) => {
            return mentor.name.match(search);
        })
        setIsUpdate(false);
        setFilteredData([...result]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        setIsUpdate(true);
    },[filteredData]);

    function onSearch(name: string) {
        setSearch(name);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    };

    function handleRowClick(params: any, e: any) {
        props.onRowSelection(params.row);
        handleClose();
    }

    return (
        <>
            <CssBaseline />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                
                <Fade in={open}>
                    <div className={styles.container}>
                        <div className={styles.container__header}>
                            <span>Find Mentor</span>
                        </div>

                        <div className={styles.container__body}>
                            <div className={styles.container__body__search}>
                                <SearchInput
                                    onSubmit={onSearch}
                                    placeholder='Search by surname'
                                />
                            </div>
                            <div className={styles.container__body__table}>
                                {isUpdate &&
                                    (<ReusableTable
                                        name=""
                                        getData={() => Promise.resolve(data)}
                                        columns={props.columns}
                                        onRowClick={handleRowClick}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            </>
        )
};

export default FindModal;
