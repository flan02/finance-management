'use client'
import CountUp from 'react-countup'

type Props = {
  amount: number
}

const AnimatedCounter = ({ amount }: Props) => {
  return (
    <div className='w-full'>
      <CountUp
        decimals={2}
        decimal=','
        prefix='$'
        end={amount}
      />
    </div>
  )
}

export default AnimatedCounter