import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'NextChat | LogIn',
};

const LoginPage = () => {
    return (
        <main className='flex items-center justify-center'>
            <form className=' w-[100%] md:w-[50%] md:max-w-[450px] lg:w-[40%]'>
                <Card className=''>
                    <CardHeader className='flex gap-3'>
                        <div className='flex flex-col'>
                            <p className='text-md'>Login</p>
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
                        />
                        <Input
                            type='password'
                            variant={'bordered'}
                            label='Password'
                            placeholder='Enter your password'
                            radius='sm'
                            fullWidth
                            labelPlacement='outside'
                        />
                        <div className='flex flex-row justify-end'>
                            <Button size='sm'>Submit</Button>
                        </div>
                    </CardBody>
                    <hr />
                    <CardFooter className=' text-small text-default-500'>
                        {"don't have an account Register."}
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
};

export default LoginPage;
