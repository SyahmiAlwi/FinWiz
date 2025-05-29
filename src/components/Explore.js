import React, { useState } from 'react';
import { GlobeAltIcon, LinkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import maraLogo from '../assets/images/maralogo.png';
import ptptnLogo from '../assets/images/ptptnlogo.png';
import jpaLogo from '../assets/images/jpalogo.png';

// Expanded quiz questions
const quizQuestions = [
  { question: 'What percentage of your income should ideally go to savings?', options: ['5%', '10%', '20%', '50%'], answer: '20%' },
  { question: 'Diverse investment helps reduce...', options: ['Liquidity', 'Risk', 'Interest rates', 'Inflation'], answer: 'Risk' },
  { question: 'Which account is best for emergency funds?', options: ['Checking', 'Savings', 'Stock Market', 'Real Estate'], answer: 'Savings' },
  { question: 'A budget surplus means...', options: ['You spent more than earned', 'You earned more than spent', 'Income equals expenses', 'No income'], answer: 'You earned more than spent' },
  { question: 'What is a key benefit of compound interest?', options: ['Simple growth', 'Faster debt', 'Exponential growth', 'No growth'], answer: 'Exponential growth' },
  { question: 'Diversification in investing helps to...', options: ['Increase fees', 'Reduce risk', 'Guarantee profit', 'Eliminate taxes'], answer: 'Reduce risk' },
];

const Explore = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [debt, setDebt] = useState('');
  const [healthReport, setHealthReport] = useState(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [showAllResources, setShowAllResources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const lenders = [
  { name: 'JPA', url: 'https://www.jpa.gov.my', description: 'Provides scholarships and loan grants. Knowing JPA helps you access funding opportunities and understand eligibility criteria for your education finances. Visit their site for application details and deadlines.' },
  { name: 'PTPTN', url: 'https://www.ptptn.gov.my', description: 'Issues student loans for higher education. PTPTN is essential for low-interest financing options and repayment schemes. Check their site for loan eligibility, repayment calculators, and disbursement schedules.' },
  { name: 'MARA', url: 'https://www.mara.gov.my', description: 'Supports students with loans and educational programs. MARA offers tailored loans and bursaries. Explore their website to learn about program requirements, scholarship applications, and empowerment initiatives.' },
];

  const resources = [
    { title: 'Financial Faiz', url: 'https://www.youtube.com/@FinancialFaiz', platform: 'YouTube' },
    { title: 'Afham Yusof', url: 'https://www.youtube.com/@afhamyusof', platform: 'YouTube' },
    { title: 'Mr Money TV', url: 'https://www.youtube.com/@MrMoneyTV', platform: 'YouTube' },
    { title: 'Direct Lending', url: 'https://www.tiktok.com/@directlendingmy?lang=en', platform: 'TikTok' },
    { title: 'PTree Sulaiman | Simpanan Emas', url: 'https://www.tiktok.com/@ptree_sulaiman?lang=en', platform: 'TikTok' },
    { title: 'AbangJakPar', url: 'https://www.tiktok.com/@faredabdullah?lang=en', platform: 'TikTok' },
    { title: 'Investopedia', url: 'https://www.investopedia.com', platform: 'Web' },
    { title: 'LinkedIn Guide', url: 'https://www.linkedin.com/pulse/10-ways-college-student-can-start-own-financial-plan-guddi-sharma-advjc/', platform: 'LinkedIn' },
  ];

  // Financial health check
  const handleHealthCheck = (e) => {
    e.preventDefault();
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    const dbt = parseFloat(debt) || 0;
    // savings rate
    const saveRate = inc > 0 ? ((inc - exp) / inc) * 100 : 0;
    // debt-to-income ratio
    const dti = inc > 0 ? (dbt / inc) * 100 : 0;
    // emergency fund recommendation (3-6 months)
    const recommendedEmergency = inc > 0 ? (inc * 3).toFixed(2) : 0;

    let advice = [];
    if (saveRate < 20) advice.push('Aim to save at least 20% of your income.');
    else advice.push('Great job on a healthy savings rate!');
    if (dti > 36) advice.push('Your debt-to-income ratio is high. Consider reducing debt.');
    else advice.push('Your debt-to-income ratio is within a healthy range.');
    advice.push(`Recommended emergency fund: RM ${recommendedEmergency} (${inc > 0 ? '3 months' : 'N/A'}).`);

    setHealthReport({ saveRate: saveRate.toFixed(1), dti: dti.toFixed(1), advice });
  };

  const handleOptionSelect = opt => {
    setQuizAnswers({ ...quizAnswers, [currentQ]: opt });
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setShowAnswer(false);
    } else {
      const correct = quizQuestions.reduce((sum, q, idx) => sum + (quizAnswers[idx] === q.answer ? 1 : 0), 0);
      setQuizResult(`${correct} / ${quizQuestions.length} correct`);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div className="relative p-6 lg:p-10 space-y-12" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>

      {/* About Section */}
      <motion.section className="relative bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white py-16 px-6 rounded-lg overflow-hidden" variants={fadeIn}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="inline-flex items-center gap-2"> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5a1 1 0 100 2 1 1 0 000-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              FinWiz
            </span>
          </h1>
          <p className="text-lg md:text-xl">Your one-stop platform for budgeting, loan management, and financial literacy.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0" style={{ height: 100 }}>
          <svg viewBox="0 0 500 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C150,80 350,0 500,40 L500,100 L0,100 Z" fill="#f2f3f5" />
          </svg>
        </div>
      </motion.section>

      {/* Lenders Section */}
      <motion.section className="rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Lender Organizations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {lenders.map(l => (
              <motion.a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-[#0BCDAA] hover:shadow-2xl hover:-translate-y-1 transition relative overflow-hidden"
                whileHover={{ scale: 1.02 }}>
                <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10" style={{ 
                  backgroundImage: `url(${l.name === 'MARA' ? maraLogo : l.name === 'PTPTN' ? ptptnLogo : jpaLogo})` 
                }}></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <LinkIcon className="h-6 w-6 text-[#0BCDAA]" /> {l.name}
                  </h3>
                  <p className="prose text-gray-600">{l.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

      {/* Student Telegram Groups Section */}
      <motion.section className="rounded-lg" variants={fadeIn}>
        <h2 className="text-3xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
          <svg className="h-8 w-8 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Student Telegram Groups
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.a 
            href="https://t.me/joinchat/w7CHfiVa4spmYTY9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-[#0088cc] hover:shadow-2xl hover:-translate-y-1 transition group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10" style={{ backgroundImage: `url(${maraLogo})` }}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-6 w-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <h3 className="text-2xl font-bold">MARA Students</h3>
              </div>
              <p className="prose text-gray-600">Connect with other MARA scholars. Share experiences, ask questions, and get support from peers who understand the MARA journey.</p>
              <div className="mt-4 text-[#0088cc] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Join Telegram Group
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>

          <motion.a 
            href="https://t.me/perbincanganPTPTN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-[#0088cc] hover:shadow-2xl hover:-translate-y-1 transition group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10" style={{ backgroundImage: `url(${ptptnLogo})` }}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-6 w-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <h3 className="text-2xl font-bold">PTPTN Students</h3>
              </div>
              <p className="prose text-gray-600">Join the PTPTN discussion group. Get advice on loan applications, repayment strategies, and connect with other PTPTN borrowers.</p>
              <div className="mt-4 text-[#0088cc] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Join Telegram Group
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>

          <motion.a 
            href="https://t.me/+puN3KTMEU000NWE9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-[#0088cc] hover:shadow-2xl hover:-translate-y-1 transition group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10" style={{ backgroundImage: `url(${jpaLogo})` }}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-6 w-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <h3 className="text-2xl font-bold">JPA Scholars</h3>
              </div>
              <p className="prose text-gray-600">Connect with fellow JPA scholars. Share scholarship experiences, discuss opportunities, and build your professional network.</p>
              <div className="mt-4 text-[#0088cc] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Join Telegram Group
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>
        </div>
      </motion.section>

      {/* Resources Section with See More */}
      <motion.section className="py-12 rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Financial Advice Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {(showAllResources ? resources : resources.slice(0,4)).map(r => (
              <motion.a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                className="p-6 bg-gray-50 rounded-lg shadow-xl border hover:shadow-2xl hover:-translate-y-1 transition"
                whileHover={{ scale: 1.02 }}>
                <h3 className="text-2xl font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-gray-500">Platform: {r.platform}</p>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllResources(!showAllResources)}
              className="py-2 px-6 bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white rounded-lg shadow hover:from-[#05A6D4] hover:to-[#0BCDAA] transition transform hover:-translate-y-1"
            >{showAllResources ? 'See Less' : 'See More'}
            </button>
          </div>
        </motion.section>

      {/* Financial Health Check */}
      <motion.section className="py-12 rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center flex justify-center items-center gap-2"><ChartBarIcon className="h-8 w-8 text-[#05A6D4]" /> Advanced Financial Health Check</h2>
          <form onSubmit={handleHealthCheck} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Income (RM)</label>
            <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 5000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Expenses (RM)</label>
            <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 3000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Monthly Debt (RM)</label>
            <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 1000" />
          </div>
          <button type="submit" className="py-2 px-4 bg-[#05A6D4] text-white rounded hover:bg-[#0BCDAA] transition transform hover:-translate-y-1 col-span-full md:col-span-1">Check Health</button>
        </form>
        {healthReport && (
            <div className="max-w-4xl mx-auto mt-8 prose lg:prose-lg">
              <h3>Results:</h3>
              <p><strong>Savings Rate:</strong> {healthReport.saveRate}%</p>
              <p><strong>Debt-to-Income Ratio:</strong> {healthReport.dti}%</p>
              <h4>Advice:</h4>
              <ul>
                {healthReport.advice.map((tip,i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
      </motion.section>

      {/* Quiz Section */}
      <motion.section className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-[#0BCDAA]" variants={fadeIn}>
        <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
          <svg className="h-8 w-8 text-[#0BCDAA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Financial Literacy Quiz
        </h2>
        <div className="max-w-4xl mx-auto">
          {quizResult ? (
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-gray-800 mb-4">
                Your Score: <span className="text-[#0BCDAA]">{quizResult}</span>
              </div>
              <button
                onClick={() => {
                  setQuizResult(null);
                  setCurrentQ(0);
                  setQuizAnswers({});
                  setShowAnswer(false);
                }}
                className="py-2 px-6 bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white rounded-lg shadow hover:from-[#05A6D4] hover:to-[#0BCDAA] transition transform hover:-translate-y-1"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Question {currentQ + 1} of {quizQuestions.length}</span>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#0BCDAA] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="mb-6 text-xl font-medium text-gray-800">{quizQuestions[currentQ].question}</p>
              <div className="space-y-3">
                {quizQuestions[currentQ].options.map(opt => {
                  const isSelected = quizAnswers[currentQ] === opt;
                  const isCorrect = opt === quizQuestions[currentQ].answer;
                  const showFeedback = showAnswer && (isSelected || isCorrect);
                  
                  return (
                    <button
                      key={opt}
                      onClick={() => !showAnswer && handleOptionSelect(opt)}
                      className={`block w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        showFeedback
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                          : isSelected
                          ? 'border-[#0BCDAA] bg-[#ECFEF9] transform -translate-y-1 shadow-md'
                          : 'border-gray-200 hover:border-[#0BCDAA] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {showFeedback && (
                          <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : isSelected ? 'text-red-600' : ''}`}>
                            {isCorrect ? '✓ Correct' : isSelected ? '✗ Incorrect' : ''}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-8">
                {currentQ > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQ(currentQ - 1);
                      setShowAnswer(false);
                    }}
                    className="py-2 px-6 text-gray-600 hover:text-[#0BCDAA] transition"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  disabled={!showAnswer}
                  className={`py-2 px-6 rounded-lg shadow transition transform hover:-translate-y-1 ${
                    !showAnswer
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white hover:from-[#05A6D4] hover:to-[#0BCDAA]'
                  }`}
                >
                  {currentQ < quizQuestions.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Explore;
