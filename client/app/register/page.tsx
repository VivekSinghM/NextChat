'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { allPaths } from '@/utils/constant/paths';
import { supabase } from '@/utils/supabase/client';

type formInputsFields = {
    email: string;
    password: string;
    confirmPassword: string;
};
const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const onSubmit: SubmitHandler<formInputsFields> = (data) => {
        setLoading(true);
        supabase.auth
            // @ts-ignore
            .signUp({
                email: data.email,
                password: data.password,
            })
            .then(({ error }) => {
                if (error) {
                    console.log(error);
                }
            })
            .finally(() => {
                setLoading(false);
                // reset();
            });
    };

    return (
        <div className='flex h-full items-center justify-center'>
            <form
                className=' w-[100%] md:w-[50%] md:max-w-[450px] lg:w-[40%]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Card className=''>
                    <CardHeader className='flex gap-3'>
                        <div className='flex flex-col'>
                            <p className='text-md'>Register</p>
                            <p className='text-small text-default-300'>
                                NextChat
                            </p>
                        </div>
                    </CardHeader>
                    <hr />
                    <CardBody className='gap-4'>
                        <Input
                            type='email'
                            variant={'bordered'}
                            label='Email'
                            placeholder='Enter your email'
                            labelPlacement='outside'
                            radius='sm'
                            fullWidth
                            autoFocus
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Invalid email',
                                },
                            })}
                        />
                        <Input
                            type='password'
                            variant={'bordered'}
                            label='Password'
                            placeholder='Enter your password'
                            radius='sm'
                            fullWidth
                            labelPlacement='outside'
                            {...register('password', {
                                required: 'Password is required',
                                // pattern: {
                                //   value:
                                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                //   message:
                                //     "Password must contain at least 8 characters, including UPPER/lowercase, one number and special characters",
                                // },
                            })}
                        />
                        <Input
                            type='password'
                            variant={'bordered'}
                            label='Password'
                            placeholder='Enter your password'
                            radius='sm'
                            fullWidth
                            labelPlacement='outside'
                            {...register('confirmPassword', {
                                required: 'Password is required',
                                validate: (value) => {
                                    {
                                        return (
                                            value === getValues().password ||
                                            'The passwords do not match'
                                        );
                                    }
                                },
                            })}
                        />
                        <div className='flex flex-row justify-end'>
                            <Button size='sm' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </CardBody>
                    <hr />
                    <CardFooter className=' text-small text-default-500'>
                        {`Already have an account`}&nbsp;
                        <Link href={allPaths.login} className='underline'>
                            {'login'}
                        </Link>
                        .
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default RegisterPage;
