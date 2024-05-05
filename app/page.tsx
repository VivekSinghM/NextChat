import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';

export default function Home() {
    return (
        <section className='flex w-full flex-row gap-1 py-2'>
            <div className='w-1/4 border-spacing-0 border'>contacts</div>
            <div className='w-3/4 border-spacing-0 border'>chat</div>
        </section>
    );
}
