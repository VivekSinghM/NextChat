'use client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { allPaths } from '@/utils/constant/paths';
import { useAuthContext } from '@/context/AuthProvider/AuthProvider';

type formInputsFields = {
    first_name: string;
    last_name: string;
    about: string;
};

const OnboardingPage = () => {
    const { handleUserUpdate } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            about: '',
        },
    });
    const onSubmit: SubmitHandler<formInputsFields> = (data) => {
        setLoading(true);
        handleUserUpdate({ data, op: 'create' }).then(() => {
            setLoading(false);
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
                            <p className='text-md'>Onboarding Form</p>
                            <p className='text-small text-default-300'>
                                NextChat
                            </p>
                        </div>
                    </CardHeader>
                    <hr />
                    <CardBody className='gap-4'>
                        <Input
                            type='text'
                            variant={'bordered'}
                            label='First Name'
                            labelPlacement='outside'
                            radius='sm'
                            fullWidth
                            autoFocus
                            {...register('first_name', {
                                required: 'First Name is required',
                            })}
                            errorMessage={
                                errors.first_name
                                    ? errors.first_name.message
                                    : null
                            }
                            // helperText={String(errors?.email?.message || '')}
                        />
                        <Input
                            type='text'
                            variant={'bordered'}
                            label='Last Name'
                            radius='sm'
                            fullWidth
                            labelPlacement='outside'
                            {...register('last_name')}
                        />
                        <Input
                            type='text'
                            variant={'bordered'}
                            label='About'
                            radius='sm'
                            fullWidth
                            labelPlacement='outside'
                            {...register('about')}
                        />
                        <div className='flex flex-row justify-end'>
                            <Button size='sm' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </form>
        </div>
    );
};

export default OnboardingPage;
