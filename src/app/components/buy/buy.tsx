// 'use client';

// import { useState } from 'react';
// import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
// import { useDisconnect } from '@reown/appkit/react';
// import { cn } from '@/lib/utils';
// import { Connection, PublicKey, Transaction } from '@solana/web3.js';
// import {
//    getAssociatedTokenAddress,
//    createTransferInstruction
// } from '@solana/spl-token';
// import bs58 from 'bs58';
// import { useSearchParams } from 'next/navigation';

// declare global {
//    namespace JSX {
//       interface IntrinsicElements {
//          div: React.DetailedHTMLProps<
//             React.HTMLAttributes<HTMLDivElement>,
//             HTMLDivElement
//          >;
//          h1: React.DetailedHTMLProps<
//             React.HTMLAttributes<HTMLHeadingElement>,
//             HTMLHeadingElement
//          >;
//          p: React.DetailedHTMLProps<
//             React.HTMLAttributes<HTMLParagraphElement>,
//             HTMLParagraphElement
//          >;
//          button: React.DetailedHTMLProps<
//             React.ButtonHTMLAttributes<HTMLButtonElement>,
//             HTMLButtonElement
//          >;
//          a: React.DetailedHTMLProps<
//             React.AnchorHTMLAttributes<HTMLAnchorElement>,
//             HTMLAnchorElement
//          >;
//          img: React.DetailedHTMLProps<
//             React.ImgHTMLAttributes<HTMLImageElement>,
//             HTMLImageElement
//          >;
//          br: React.DetailedHTMLProps<
//             React.HTMLAttributes<HTMLBRElement>,
//             HTMLBRElement
//          >;
//       }
//    }
// }

// const buttonVariants = {
//    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
//    variants: {
//       default: 'bg-[#8A7D57] text-white shadow hover:bg-[#6B5F43]'
//    },
//    sizes: {
//       default: 'h-9 px-4 py-2',
//       large: 'h-12 px-8 py-3 text-lg'
//    }
// };

// // USDC на Solana mainnet
// const USDC_TOKEN = {
//    address: 'BK2J3DaVb1Pv6xxTfJjBWyPYAh4i17f1VNp9oWjrpump',
//    decimals: 6
// };

// const RECIPIENT_ADDRESS = 'Ax8fpk6tfAvk5HRgVo3C2AjTvrG6S3rtWygvJg6ARxbW'; // Замените на реальный адрес

// export default function Buy() {
//    const { open } = useAppKit();
//    const { disconnect } = useDisconnect();
//    const solanaAccount = useAppKitAccount({ namespace: 'solana' });
//    const isConnected = solanaAccount.isConnected;
//    const [isLoading, setIsLoading] = useState(false);
//    const [error, setError] = useState<string | null>(null);
//    const [transactionLink, setTransactionLink] = useState<string | null>(null);
//    const searchParams = useSearchParams();
//    const plan = searchParams.get('plan');

//    // Выбор суммы в зависимости от плана
//    const TOKEN_AMOUNT = plan === '2' ? 100000 : 2000000;

//    const connectWallet = async (): Promise<void> => {
//       try {
//          await open({
//             view: 'Connect',
//             namespace: 'solana'
//          });
//       } catch (error) {
//          console.error('Wallet connection error:', error);
//       }
//    };

//    const disconnectWallet = async (): Promise<void> => {
//       try {
//          await disconnect();
//       } catch (error) {
//          console.error('Error disconnecting wallet:', error);
//       }
//    };

//    const handleBuy = async () => {
//       if (!solanaAccount.address) return;

//       setIsLoading(true);
//       setError(null);
//       setTransactionLink(null);

//       try {
//          const connection = new Connection(
//             'https://mainnet.helius-rpc.com/?api-key=b3157c76-c2ae-47a3-bb24-1181b54d4c62'
//          );
//          const publicKey = new PublicKey(solanaAccount.address);
//          const transaction = new Transaction();

//          // Получаем адреса токен-аккаунтов
//          const tokenMint = new PublicKey(USDC_TOKEN.address);
//          const recipientTokenAccount = await getAssociatedTokenAddress(
//             tokenMint,
//             new PublicKey(RECIPIENT_ADDRESS)
//          );

//          const sourceTokenAccount = await getAssociatedTokenAddress(
//             tokenMint,
//             publicKey
//          );

//          // Конвертируем сумму в наименьшие единицы (с учетом decimals)
//          const transferAmount = Math.floor(
//             TOKEN_AMOUNT * Math.pow(10, USDC_TOKEN.decimals)
//          );

//          // Добавляем инструкцию перевода токенов
//          transaction.add(
//             createTransferInstruction(
//                sourceTokenAccount,
//                recipientTokenAccount,
//                publicKey,
//                transferAmount
//             )
//          );

//          // Получаем последний блокхеш
//          const { blockhash } = await connection.getLatestBlockhash('finalized');
//          transaction.recentBlockhash = blockhash;
//          transaction.feePayer = publicKey;

//          // Подписываем и отправляем транзакцию через Phantom
//          const encodedTransaction = bs58.encode(
//             transaction.serialize({
//                requireAllSignatures: false,
//                verifySignatures: false
//             })
//          );

//          const { signature } = await window.solana.request({
//             method: 'signAndSendTransaction',
//             params: {
//                message: encodedTransaction
//             }
//          });

//          // Ждем подтверждения транзакции
//          const confirmation = await connection.confirmTransaction(
//             signature,
//             'confirmed'
//          );

//          if (confirmation.value.err) {
//             throw new Error('Transaction failed to confirm');
//          }

//          // Создаем ссылку на транзакцию
//          const txLink = `https://explorer.solana.com/tx/${signature}`;
//          setTransactionLink(txLink);
//       } catch (error: unknown) {
//          console.error('Transaction error:', error);
//          setError(
//             error instanceof Error ? error.message : 'Transaction failed'
//          );
//       } finally {
//          setIsLoading(false);
//       }
//    };

//    return (
//       <div className="min-h-screen flex items-center justify-center bg-[url('/grid.png')] bg-repeat">
//          <div className='bg-white border border-[#e6e28a] rounded-[48px] shadow-lg px-8 py-12 max-w-md w-full flex flex-col items-center relative'>
//             {/* Логотип/иконка */}
//             <div className='absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center'>
//                <img src='/logo.png' alt='logo' />
//             </div>
//             <div className='h-16' />
//             <h1
//                className='text-2xl font-black text-center mb-4 text-black tracking-wide'
//                style={{ fontFamily: 'Oswald, Arial, sans-serif' }}
//             >
//                Activate Your Plan
//             </h1>
//             <div className='text-center text-black mb-2 font-medium text-lg'>
//                Connect Your Wallet
//             </div>
//             <div className='text-center text-black mb-8 text-base font-normal'>
//                to start unlocking the full power of TokenoActive.
//                <br />
//                Connect your Web3 wallet and proceed
//                <br />
//                to activate your subscription.
//             </div>

//             {transactionLink ? (
//                <div className='bg-[#f7f7e6] p-6 rounded-lg w-full text-center'>
//                   <div className='text-xl font-bold mb-2 text-[#8A7D57]'>
//                      Transaction Successful!
//                   </div>
//                   <div className='mb-2 text-black'>
//                      Please send this link to your manager:
//                   </div>
//                   <a
//                      href={transactionLink}
//                      target='_blank'
//                      rel='noopener noreferrer'
//                      className='text-[#8A7D57] hover:text-[#6B5F43] break-all underline'
//                   >
//                      {transactionLink}
//                   </a>
//                </div>
//             ) : (
//                <>
//                   {!isConnected ? (
//                      <button
//                         onClick={connectWallet}
//                         disabled={isLoading}
//                         className='w-full mt-4 py-3 rounded-[12px] bg-[#e6e28a] text-black font-black text-xl uppercase tracking-wider shadow hover:bg-[#d6d26a] transition-all border border-[#e6e28a]'
//                         style={{ fontFamily: 'Oswald, Arial, sans-serif' }}
//                      >
//                         {isLoading ? 'Connecting...' : 'connect'}
//                      </button>
//                   ) : (
//                      <>
//                         <div className='mb-6'>
//                            <div className='text-lg font-semibold text-black mb-1'>
//                               Selected Subscription
//                            </div>
//                            <div className='text-3xl font-black text-[#8A7D57]'>
//                               {TOKEN_AMOUNT.toLocaleString()} $TICKER
//                            </div>
//                         </div>
//                         <button
//                            onClick={handleBuy}
//                            disabled={isLoading}
//                            className='w-full py-3 rounded-[12px] bg-[#e6e28a] text-black font-black text-xl uppercase tracking-wider shadow hover:bg-[#d6d26a] transition-all border border-[#e6e28a] cursor-pointer'
//                            style={{ fontFamily: 'Oswald, Arial, sans-serif' }}
//                         >
//                            {isLoading ? 'Processing...' : 'buy'}
//                         </button>
//                         {error && (
//                            <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg w-full text-center text-sm'>
//                               {error}
//                            </div>
//                         )}
//                         <button
//                            onClick={disconnectWallet}
//                            className='w-full mt-2 text-[#8A7D57] hover:text-[#6B5F43] font-medium transition-colors text-base underline'
//                         >
//                            Disconnect Wallet
//                         </button>
//                      </>
//                   )}
//                </>
//             )}
//          </div>
//       </div>
//    );
// }
