import VerifyEmail from '@/components/VerifyEmail';
import Image from 'next/image';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container pt-20 lg:px-0">
      <div className="mx-auto space-y-6 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-60 w-60">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="hippo email sent image"
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p>We&apos;ve sent a verification link to your email</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
