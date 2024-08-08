"use client"

import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"
import Template from "@/components/Template"

const questions = [
  {
    q: "Do I have to book online?",
    a: "Nope! The calendar is here you're welcome to reach out to me by phone or text to schedule if you prefer that.",
  },
  {
    q: "How much space is needed to set up your massage table or chair?",
    a: "I'll need roughly a 6-foot by 8-foot space for the table, and a 5-foot by 5-foot space for the chair. I've worked in smaller spaces before and can do so if that's all that is available.",
  },
  {
    q: "What areas do you service for in-home massages?",
    a: "I serve the greater Los Angeles Area, based out of Westchester by LAX. Feel free to contact me if you're unsure.",
  },
  {
    q: "How do I book an appointment through your website, phone, or email?",
    a: "You can easily schedule an appointment through the booking page on my website, or feel free to call or email me directly for assistance.",
  },
  {
    q: "What types of massage therapy do you offer in-home?",
    a: "I offer Swedish, deep tissue, sports massages, and stretching withing all my sessions, customized to fit whatever you need most.",
  },
  {
    q: "Do I need to provide any equipment for the massage session?",
    a: "No need! I bring my own massage table or chair, sheets, and music to create a relaxing environment.",
  },
  {
    q: "What should I do to prepare for an in-home massage session?",
    a: "Do your best to make sure the room is at a comfortable temperature and minimize noise. If you've got your preferred music you're welcome to do that, otherwise I supply my own speaker and music for the session.",
  },
  {
    q: "How long do the massage sessions typically last?",
    a: "Sessions are typically 60, 90, or 120 minutes, with 90 minutes being the most common. It can take between 30 and 45 minutes to fully relax into a massage session, so I tend to recommend at least a 90 minute duration.",
  },
  {
    q: "What are your pricing and payment options?",
    a: "Pricing varies by session length and type. I accept cash, credit cards, and online payments. Tips are always appreciated, but I set my prices at a rate where I feel fairly compensated for the work provided.",
  },
  {
    q: "What is your cancellation and rescheduling policy?",
    a: "Please do your best to provide at least 24 hours' notice for cancellations or rescheduling. A fee may apply for late cancellations, or I may require future sessions to be prepaid before accepting.",
  },
  {
    q: "Are there any health conditions that would prevent me from getting a massage?",
    a: "Certain conditions, like recent surgeries or severe skin issues, might require a doctor's approval. When in doubt, consult with your physician first.",
  },
  {
    q: "What should I wear during the massage?",
    a: "Wear whatever makes you comfortable. Many clients choose to undress to their comfort level and are draped appropriately during the session.",
  },
  {
    q: "Do you offer massage packages or gift certificates?",
    a: "Yes, I offer packages for multiple sessions at a discounted rate, and gift certificates are available for special occasions.",
  },
  {
    q: "What if I have specific health concerns or injuries?",
    a: "Please inform me of any health concerns or injuries in advance. I can tailor the session to accommodate your needs safely.",
  },
  {
    q: "What precautions do you take for hygiene and safety?",
    a: "I adhere to strict sanitation practices, including thoroughly cleaning all equipment and sheets and following personal hygiene protocols.",
  },
]

const AuthorCard = () => {
  return (
    <div className="w-full pb-6">
      <Template title="Frequently Asked Questions" />
      <div className="flex w-full flex-col items-center justify-center">
        {questions.map((item) => (
          <Disclosure as="div" key={item.q} className="pb-4 w-full">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg border dark:border-primary-400 bg-none px-4 py-2 text-left font-medium text-gray-900 dark:text-white hover:bg-primary-200 hover:dark:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75">
                  <span>{item.q}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-primary-500`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0">
                  <Disclosure.Panel className="px-4 pb-2 pt-4">
                    {item.a}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

export default AuthorCard
