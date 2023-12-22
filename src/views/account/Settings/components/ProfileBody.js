import React, {useState} from 'react'
import {
    Input,
    Button,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import * as Yup from 'yup'
import { ConfirmDialog } from 'components/shared'
import useAuth from 'utils/hooks/useAuth'
import { apiDeleteMember, apiPostMemberDetails } from 'services/AccountServices'


const { Control } = components

const validationSchema = Yup.object().shape({
    bodyHeight : Yup.number()
        .moreThan(0, '0보다 큰 숫자만 가능합니다.')
        .lessThan(300, '300보다 작은 숫자만 가능합니다.')
        .required('키를 입력해 주세요.'),
    bodyWeight : Yup.number()
        .moreThan(0, '0보다 큰 숫자만 가능합니다.')
        .lessThan(300, '300보다 작은 숫자만 가능합니다.')
        .required('몸무게를 입력해 주세요.'),
    bodyWishWeight : Yup.number()
        .moreThan(0, '0보다 큰 숫자만 가능합니다.')
        .lessThan(300, '300보다 작은 숫자만 가능합니다.')
        .required('목표 몸무게를 입력해 주세요.'),
    bodyWishConscal : Yup.number()
        .moreThan(0, '0보다 큰 숫자만 가능합니다.')
        .lessThan(10000, '10000보다 작은 숫자만 가능합니다.')
        .required('목표 섭취칼로리를 입력해 주세요.'),
    bodyWishBurncal : Yup.number()
        .moreThan(0, '0보다 큰 숫자만 가능합니다.')
        .lessThan(10000, '10000보다 작은 숫자만 가능합니다.')
        .required('목표 소모칼로리를 입력해 주세요.'),
    
})



const ProfileBody = ({ data, onDataUpdate  }) => {
    const [open, setOpen] = useState(false)
    const { signOut } = useAuth();

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = async () => {
        const response = await apiDeleteMember();
        signOut();
        setOpen(false);
    }

    const onFormSubmit = async (values, setSubmitting) => {
        await apiPostMemberDetails(values)
            .then((res) => {
                onDataUpdate(res.data.data.updateInfo);
            toast.push(<Notification title={'수정이 완료되었습니다.'} type="success" />, { placement: 'top-center' });
            })
            .catch((err) => {
                toast.push(<Notification title={'API 호출 에러'} type="danger" />, { placement: 'top-center' });
            });
        
        setSubmitting(false);
    }
    
    return (
        <>
        <Formik
            initialValues={{
                bodyHeight : data.bodyHeight || 0,
                bodyWeight : data.bodyWeight || 0,
                bodyWishWeight : data.bodyWishWeight || 0,
                bodyWishConscal : data.bodyWishConsCal || 0,
                bodyWishBurncal : data.bodyWishBurnCal || 0
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                className="mt-8"
                                title="신체 정보"
                                desc="회원님의 신체정보입니다."
                            />
                            <FormRow
                                name="bodyHeight"
                                label="키"
                                {...validatorProps}
                            >
                                <div className="items-center grid grid-cols-2 gap-2">
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="bodyHeight"
                                    component={Input}
                                />
                                <>Cm</>
                                </div>
                            </FormRow>
                            <FormRow
                                name="bodyWeight"
                                label="몸무게"
                                {...validatorProps}
                            >
                                <div className="items-center grid grid-cols-2 gap-2">
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="bodyWeight"
                                        component={Input}
                                    />
                                    <>Kg</>
                                </div>
                            </FormRow>
                            <FormRow
                                name="bodyWishWeight"
                                label="목표 몸무게"
                                {...validatorProps}
                            >
                                <div className="items-center grid grid-cols-2 gap-2">
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="bodyWishWeight"
                                        component={Input}
                                    />
                                    <>Kg</>
                                </div>
                            </FormRow>
                            <FormRow
                                name="bodyWishConscal"
                                label="목표 섭취 칼로리"
                                {...validatorProps}
                            >
                                <div className="items-center grid grid-cols-2 gap-2">
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="bodyWishConscal"
                                        component={Input}
                                    />
                                    <>Kcal</>
                                </div>
                            </FormRow>
                            <FormRow
                                name="bodyWishBurncal"
                                label="목표 소모 칼로리"
                                {...validatorProps}
                            >
                                <div className="items-center grid grid-cols-2 gap-2">
                                    <Field className="d-flex"
                                        type="number"
                                        autoComplete="off"
                                        name="bodyWishBurncal"
                                        component={Input}
                                    />
                                    <>Kcal</>
                                </div>
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => setOpen(true)}
                                >
                                    탈퇴하기
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? '수정중' : '신체정보 수정'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>

        <ConfirmDialog
                isOpen={open}
                onClose={handleClose}
                onRequestClose={handleClose}
                type="danger"
                title="정말 탈퇴하시겠습니까?"
                onCancel={handleClose}
                onConfirm={handleConfirm}
                confirmButtonColor='red-600'
                cancelText='취소'
                confirmText='확인'
            >
                <p>
                    언제든 다시 만날 수 있기를 기대하며, 항상 건강하시길 바랍니다.<br />
                    탈퇴한 회원은 복구할 수 없습니다.
                </p>
        </ConfirmDialog>
        </>
        
        
    )
}

export default ProfileBody
