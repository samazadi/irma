// donate page. This page will contain:
// - ability to Create a book    

import { SubmitHandler, useForm } from 'react-hook-form';
import { DonationFormValues } from '../../types';
import "./index.scss";

const Donate = () => {
    const { register, handleSubmit, errors } = useForm<DonationFormValues>();

    const onSubmit: SubmitHandler<DonationFormValues> = data => {
        alert(JSON.stringify(data));
    };

    return (
        <div className="donate-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="text-center mt-4">
                            <h1 className="display-4">Donate</h1>
                            <p>Thank you for donating!</p>
                            <p className="mb-4">Please enter all fields below to donate your book.</p>
                        </div>
                        <div className="form-wrapper p-4 shadow mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        ref={register({ required: true, minLength: 2 })}
                                    />
                                </div>
                                {errors.title && <p className="text-danger">Title is required and min. 2 characters</p>}

                                {/* Author */}
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        ref={register({ required: true, minLength: 2 })}
                                    />
                                </div>
                                {errors.author && <p className="text-danger">Author is required and min. 2 characters</p>}

                                {/* ISBN */}
                                <div className="mb-3">
                                    <label htmlFor="isbn" className="form-label">ISBN</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="isbn"
                                        name="isbn"
                                        ref={register({ required: true, minLength: 10 })}
                                    />
                                </div>
                                {errors.isbn && <p className="text-danger">ISBN is required and min. 10 characters</p>}

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        ref={register({ required: true, maxLength: 10 })}
                                    />
                                </div>
                                {errors.description && <p className="text-danger">Description is required and min. 10 characters</p>}

                                <div className="text-center">
                                    <input type="submit" value="Donate" className="btn btn-primary btn-lg w-25" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donate;