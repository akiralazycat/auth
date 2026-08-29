(() => {
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll("[data-lang]")];
  const translatable = [...document.querySelectorAll("[data-i18n]")];

  const ja = {
    "nav.principles": "原則",
    "nav.assurance": "保証レベル",
    "nav.flows": "フロー",
    "nav.architecture": "構成",
    "hero.eyebrow": "アカウントとアイデンティティの設計",
    "hero.title": "認証が守るべきものは、ログイン画面ではなく人そのもの。",
    "hero.lede": "Passkey、外部プロバイダー、復旧、セッション、重要なアカウント操作を、人間に理解できる形で設計するための小さなガイドです。強いセキュリティを、考えやすく、保守しやすく、利用者にも説明しやすくすることを目指します。",
    "hero.ctaPrinciples": "原則を読む",
    "hero.ctaFlows": "フローを試す",
    "hero.boundaryStrong": "設計は開く。実装境界は分ける。",
    "hero.boundaryText": "セキュリティ契約や成熟したヘルパーは共有しながら、DB、秘密情報、OAuthクライアント、Passkey設定、セッション鍵は、意図的に中央集約する場合を除いて製品ごとに分離します。",
    "intro.identityTitle": "Identityはメールではない",
    "intro.identityText": "外部IDは provider と変更不能な subject の組で識別します。同じメールアドレスだからといって、自動的にアカウントを統合するのは安全ではありません。",
    "intro.recoveryTitle": "復旧は制約された状態",
    "intro.recoveryText": "復旧リンクが与えるのは、制御を取り戻すための道筋です。最初から完全権限の通常セッションを発行するものではありません。",
    "intro.proofTitle": "リスクに証明強度を合わせる",
    "intro.proofText": "通常アクセス、credential変更、認証ルートを壊す操作を、すべて同じ保証レベルで扱うべきではありません。",
    "model.eyebrow": "設計モデル",
    "model.title": "セキュリティ契約はひとつ。障害境界は意図的に分ける。",
    "model.text": "一貫性は共通ポリシーから生まれます。耐障害性は、すべての製品を同じ秘密情報・セッション・DB・Relying Party設定へ依存させないことで生まれます。",
    "model.contractKicker": "共有",
    "model.contractTitle": "セキュリティ契約",
    "model.contractText": "credential semantics · assurance · recovery · session rules",
    "model.product": "製品",
    "model.isolated": "秘密情報 + セッションを分離",
    "model.caption": "共有層が定義するのは挙動です。各製品はアカウントDB、OAuthクライアント、Passkey RP設定、署名材料、セッション名前空間を独立して持ちます。",
    "principles.eyebrow": "原則",
    "principles.title": "認証を落ち着いて考えるための12原則。",
    "principles.text": "これはフレームワークの選択ではなく、挙動の契約です。UI、DB、ホスティング、クライアント環境が変わっても維持できることを重視します。",
    "p1.title": "Identityはメールではない。",
    "p1.text": "外部IDには provider + immutable subject を使います。providerのメールはメタデータであり、merge keyではありません。",
    "p2.title": "Login・Link・Reauthenticationは別のceremony。",
    "p2.text": "各フローに明示的なintent、対象セッション、provider、有効期限、安全なreturn pathを結び付けます。",
    "p3.title": "重要操作にはfresh proofを要求する。",
    "p3.text": "古いブラウザセッションだけでcredentialや復旧設定を変更できる状態にしません。",
    "p4.title": "自分で自分を締め出せないようにする。",
    "p4.text": "利用可能なサインイン手段が0になる変更は、サーバー側で拒否します。",
    "p5.title": "数が多いことと、独立していることは違う。",
    "p5.text": "同期Passkeyが複数あれば可用性は上がりますが、同じ上流trust rootを共有している可能性があります。",
    "p6.title": "復旧は制約された状態遷移。",
    "p6.text": "十分な保証を再構築するまでは restricted recovery session を使います。",
    "p7.title": "Recovery emailをmaster keyにしない。",
    "p7.text": "受信箱へ入れることだけで、最も強い破壊的操作まで許可しません。",
    "p8.title": "Sessionには目的がある。",
    "p8.text": "Normal、共有端末用Temporary、Recovery、Nativeを、能力と寿命の違う明示的なsession kindとして扱います。",
    "p9.title": "Active sessionと履歴は別データ。",
    "p9.text": "現在のアクセス権を示す状態と、過去のsecurity eventを分けます。",
    "p10.title": "Securityは利用者が読めるようにする。",
    "p10.text": "何でサインインできるか、何が有効か、何が変わったか、なぜ追加証明が必要かを見える形にします。",
    "p11.title": "WebとNativeでpolicyを共有する。",
    "p11.text": "transportは違って構いません。assurance、recovery、credential、revocationの意味は変えません。",
    "p12.title": "Policyは共有し、blast radiusは分離する。",
    "p12.text": "安定した契約とヘルパーは再利用しながら、credentials、DB、暗号材料は製品単位で隔離します。",
    "assurance.eyebrow": "保証レベル",
    "assurance.title": "3段階あれば、操作意図を十分に明確化できる。",
    "assurance.text": "名前そのものより重要なのは、active session、fresh proof、独立したproof familyを区別することです。",
    "a0.title": "Active session",
    "a0.text": "低リスク操作では、許可された現在のセッションだけで十分です。",
    "a0.example": "例: 別の端末セッションを1つだけ失効",
    "a1.title": "Fresh proof",
    "a1.text": "最近行われたcredential証明を1つ要求します。10分程度のfreshnessは実用的な出発点です。",
    "a1.ex1": "credentialを1つ追加・削除",
    "a1.ex2": "外部providerをlink・unlink",
    "a1.ex3": "recovery emailを変更",
    "a2.title": "Independent proofs",
    "a2.text": "認証ルートを破壊する操作には、独立した2つのproof familyを要求します。",
    "a2.ex1": "すべてのPasskeyを削除",
    "a2.ex2": "アカウントを削除",
    "a2.ex3": "希少なidentity rootを解放",
    "matrix.title": "重要操作マトリクス",
    "matrix.text": "製品固有のthreat modelingに置き換わるものではなく、共通baselineです。",
    "matrix.link": "実際のフローを見る →",
    "matrix.action": "操作",
    "matrix.baseline": "基準",
    "matrix.invariant": "不変条件",
    "m1.action": "通常サインイン",
    "m1.level": "Credential",
    "m1.rule": "外部アカウントはprovider subjectで識別する",
    "m2.action": "Passkeyを追加",
    "m2.rule": "signupと制約付きrecoveryだけは明示的な例外",
    "m3.action": "Passkeyを1つ削除",
    "m3.rule": "最後の利用可能な手段は削除できない",
    "m4.action": "Providerをlink / unlink",
    "m4.rule": "intentを現在のaccount/sessionへ束縛",
    "m5.action": "Recovery emailを変更",
    "m5.rule": "新しいアドレスを独立して検証",
    "m6.action": "他の全sessionを失効",
    "m6.rule": "現在のtrusted sessionを保持・rotateする方針を明示",
    "m7.action": "すべてのPasskeyを削除",
    "m7.rule": "古いstep-up grantを失効",
    "m8.action": "アカウント削除",
    "m8.rule": "破壊的確認 + audit event",
    "m9.action": "Recoveryでcredential置換",
    "m9.level": "Restricted",
    "m9.rule": "独立credentialが残らない場合はsecurity hold",
    "flows.eyebrow": "インタラクティブ・フロー",
    "flows.title": "認証が複雑になりやすい瞬間を、1ステップずつ追う。",
    "flows.text": "シナリオを選び、判断を順番に進めてください。session kind、assurance、policy resultが状態遷移と一緒に変わります。",
    "flowTab.signin": "サインイン",
    "flowTab.link": "Provider連携",
    "flowTab.recovery": "アクセス復旧",
    "flowTab.lastMethod": "最後の手段を削除",
    "flowTab.delete": "アカウント削除",
    "flow.user": "ユーザー",
    "flow.policy": "ポリシー",
    "flow.account": "アカウント",
    "flow.prev": "← 戻る",
    "flow.next": "次へ →",
    "flow.reset": "リセット",
    "flow.state": "現在の状態",
    "flow.session": "Session",
    "flow.assurance": "Assurance",
    "flow.intent": "Intent",
    "flow.result": "Policy result",
    "flow.rule": "現在のルール",
    "recovery.eyebrow": "復旧とセッション",
    "recovery.title": "復旧は、セキュリティの近道を作らずに制御を再構築する。",
    "recovery.cardKicker": "RECOVERY",
    "recovery.cardTitle": "最初はRestricted。Normalはその後。",
    "recovery.cardText": "Recovery linkは、credential状態の確認、replacement Passkeyの追加、provider reauthenticationなどに限定されたsessionを開けます。",
    "recovery.link": "Recovery link",
    "recovery.oneUse": "single use",
    "recovery.restricted": "Restricted session",
    "recovery.narrow": "限定された能力",
    "recovery.rebuild": "Proofを再構築",
    "recovery.hold": "必要なら + hold",
    "recovery.normal": "Normal session",
    "recovery.afterPolicy": "policy充足後",
    "recovery.may": "可能",
    "recovery.may1": "credential状態を確認",
    "recovery.may2": "replacement credentialを追加",
    "recovery.may3": "recovery ceremonyを継続",
    "recovery.mustNot": "不可",
    "recovery.no1": "アカウント削除",
    "recovery.no2": "recovery addressを再変更",
    "recovery.no3": "全credential削除",
    "sessions.kicker": "SESSIONS",
    "sessions.title": "目的を明示的にmodelingする。",
    "sessions.normal": "Normal",
    "sessions.normalText": "個人端末の通常account session",
    "sessions.temp": "Temporary",
    "sessions.tempText": "短時間・non-sliding・credential変更不可",
    "sessions.recovery": "Recovery",
    "sessions.recoveryText": "アクセス復旧に限定した能力",
    "sessions.native": "Native",
    "sessions.nativeText": "安全なtoken transport、同じpolicy model",
    "sessions.noteTitle": "同じpolicy、違うtransport。",
    "sessions.noteText": "browser cookieとnative bearer tokenはtransportとして違っていても、account操作の許可条件まで変える必要はありません。",
    "architecture.eyebrow": "アーキテクチャ",
    "architecture.title": "契約を共有する。failure domainは意図的に分ける。",
    "architecture.text": "共通policyは仕様driftを減らします。分離は、1製品の侵害が自動的に全製品の侵害へ広がることを防ぎます。",
    "architecture.share": "共有しやすいもの",
    "architecture.share1": "Credential semantics",
    "architecture.share2": "OAuth intent model",
    "architecture.share3": "Step-up policy",
    "architecture.share4": "Recovery lifecycle helpers",
    "architecture.share5": "Session-kind semantics",
    "architecture.share6": "Security-event vocabulary",
    "architecture.share7": "Conformance fixtures",
    "architecture.isolate": "分離すべきもの",
    "architecture.iso1": "Account databases",
    "architecture.iso2": "OAuth secrets / private keys",
    "architecture.iso3": "Passkey RP configuration",
    "architecture.iso4": "Session / encryption keys",
    "architecture.iso5": "Cookie domains",
    "architecture.iso6": "Product migrations",
    "architecture.iso7": "Product-specific identity rows",
    "check.eyebrow": "レビュー・チェックリスト",
    "check.title": "Auth flowを完成扱いする前に。",
    "check.1": "外部identityをimmutable provider subjectで識別しているか？",
    "check.2": "callbackはlogin / link / reauthを区別できるか？",
    "check.3": "最後の利用可能なsign-in methodを削除できてしまわないか？",
    "check.4": "重要操作にはfresh proofが必要か？",
    "check.5": "破壊的root変更は通常設定より強い保証を要求するか？",
    "check.6": "Recoveryは最初にrestricted stateを作るか？",
    "check.7": "Temporary sessionでcredential変更ができてしまわないか？",
    "check.8": "Active sessionとaudit historyを分離しているか？",
    "check.9": "Nativeでも同じaction policyを保っているか？",
    "check.10": "SecretsとRelying Party設定を製品単位で分離しているか？",
    "footer.left": "— 認証SDKではなく、公開された設計ガイド。",
    "footer.right": "Securityは文脈依存です。ここでのルールをreview baselineとして使い、最後は自分の製品をthreat-modelしてください。"
  };

  const flows = {
    signin: {
      category: { en: "NORMAL ACCESS", ja: "通常アクセス" },
      steps: [
        {
          title: { en: "Choose a credential.", ja: "Credentialを選ぶ。" },
          body: { en: "A Passkey or an external provider starts the sign-in ceremony.", ja: "Passkeyまたは外部providerからsign-in ceremonyを開始します。" },
          session: { en: "None", ja: "なし" },
          assurance: "Credential",
          intent: "login",
          result: { en: "Continue", ja: "継続" },
          resultType: "neutral",
          rule: { en: "Authentication starts from an explicit credential, not from a guessed account identity.", ja: "推測されたaccount identityではなく、明示的なcredentialから認証を開始します。" },
          progress: 0.18
        },
        {
          title: { en: "Prove control of that credential.", ja: "そのCredentialの制御を証明する。" },
          body: { en: "The Passkey ceremony or provider callback proves control. Provider email may arrive as metadata, but it does not select an account by itself.", ja: "Passkey ceremonyまたはprovider callbackで制御を証明します。provider emailはmetadataとして受け取れても、それだけでaccountを決定しません。" },
          session: { en: "None", ja: "なし" },
          assurance: "Credential",
          intent: "login",
          result: { en: "Verify", ja: "検証" },
          resultType: "neutral",
          rule: { en: "Provider email is metadata, never an automatic account-merge key.", ja: "Provider emailはmetadataであり、自動account merge keyにはしません。" },
          progress: 0.42
        },
        {
          title: { en: "Resolve immutable identity.", ja: "変更不能なidentityを解決する。" },
          body: { en: "For an external provider, the server looks up provider + immutable subject. A subject already attached elsewhere fails closed.", ja: "外部providerでは provider + immutable subject で照合します。別accountに結び付いたsubjectならfail closedします。" },
          session: { en: "Pending", ja: "発行前" },
          assurance: "Credential",
          intent: "login",
          result: { en: "Match account", ja: "Account照合" },
          resultType: "good",
          rule: { en: "External identity is keyed by provider + immutable subject.", ja: "外部identityは provider + immutable subject で識別します。" },
          progress: 0.7
        },
        {
          title: { en: "Issue the normal session.", ja: "Normal sessionを発行する。" },
          body: { en: "After successful authentication, the product issues its own session. Another product should not automatically receive the same session.", ja: "認証成功後、その製品自身のsessionを発行します。別製品へ同じsessionを自動共有しません。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A0",
          intent: "login",
          result: { en: "Allowed", ja: "許可" },
          resultType: "good",
          rule: { en: "Share policy across products; keep sessions and signing material isolated.", ja: "製品間でpolicyは共有しても、sessionと署名材料は分離します。" },
          progress: 1
        }
      ]
    },
    link: {
      category: { en: "ACCOUNT LINKING", ja: "アカウント連携" },
      steps: [
        {
          title: { en: "Start from an existing account session.", ja: "既存のaccount sessionから開始する。" },
          body: { en: "Linking is not login. The user must already be inside the account they intend to modify.", ja: "Linkingはloginではありません。変更対象のaccountへすでに入っている必要があります。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A0",
          intent: "link",
          result: { en: "Need fresh proof", ja: "Fresh proofが必要" },
          resultType: "warn",
          rule: { en: "Login, linking, and reauthentication are separate ceremonies.", ja: "Login、linking、reauthenticationは別のceremonyです。" },
          progress: 0.14
        },
        {
          title: { en: "Require A1 reauthentication.", ja: "A1 reauthenticationを要求する。" },
          body: { en: "A stale browser session alone should not authorize adding a new sign-in path.", ja: "古いbrowser sessionだけで、新しいsign-in pathを追加できないようにします。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "reauth",
          result: { en: "Fresh proof", ja: "Fresh proof" },
          resultType: "good",
          rule: { en: "Credential mutations require recent proof.", ja: "Credential変更にはrecent proofを要求します。" },
          progress: 0.36
        },
        {
          title: { en: "Create a link-specific OAuth state.", ja: "Link専用OAuth stateを作る。" },
          body: { en: "Bind intent, current user, session, provider, expiry, safe return path, and PKCE/nonce material where applicable.", ja: "intent、current user、session、provider、有効期限、安全なreturn path、必要なPKCE/nonceを束縛します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "link",
          result: { en: "Bound state", ja: "State束縛" },
          resultType: "neutral",
          rule: { en: "A callback must be able to prove what ceremony it belongs to.", ja: "Callback自身が、どのceremonyに属するものか証明できる必要があります。" },
          progress: 0.58
        },
        {
          title: { en: "Verify the callback against the same account.", ja: "同じaccountに対してcallbackを再検証する。" },
          body: { en: "The server rechecks session, reauth freshness, state, provider subject, and whether that subject is already claimed.", ja: "session、reauth freshness、state、provider subject、subjectの既存利用状況をserver側で再確認します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "link",
          result: { en: "Verify ownership", ja: "所有を検証" },
          resultType: "neutral",
          rule: { en: "The provider subject must not be silently moved from another local account.", ja: "Provider subjectを別local accountから黙って移動させません。" },
          progress: 0.8
        },
        {
          title: { en: "Attach the new sign-in method.", ja: "新しいsign-in methodを追加する。" },
          body: { en: "Only after all checks pass is the immutable external identity linked to the current local account.", ja: "すべての検証を通過して初めて、immutable external identityをcurrent local accountへ連携します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "link",
          result: { en: "Allowed", ja: "許可" },
          resultType: "good",
          rule: { en: "Account linking is an explicit authenticated mutation, not an email match.", ja: "Account linkingは明示的で認証済みのmutationであり、email一致ではありません。" },
          progress: 1
        }
      ]
    },
    recovery: {
      category: { en: "ACCOUNT RECOVERY", ja: "アカウント復旧" },
      steps: [
        {
          title: { en: "Request recovery without revealing account existence.", ja: "Accountの存在を漏らさずRecoveryを要求する。" },
          body: { en: "The request response should resist enumeration whether or not the address is registered.", ja: "そのaddressが登録済みかどうかに関係なく、responseからaccount enumerationできないようにします。" },
          session: { en: "None", ja: "なし" },
          assurance: { en: "Recovery proof", ja: "Recovery proof" },
          intent: "recovery",
          result: { en: "Opaque response", ja: "同一response" },
          resultType: "neutral",
          rule: { en: "Recovery entry points should not become account-discovery endpoints.", ja: "Recovery entry pointをaccount探索endpointにしません。" },
          progress: 0.12
        },
        {
          title: { en: "Consume a short-lived, single-use token.", ja: "短命でsingle-useのtokenを消費する。" },
          body: { en: "Store only a digest server-side and consume atomically. A practical baseline is a short expiry rather than a long-lived magic link.", ja: "Server側にはdigestだけを保存し、atomicにconsumeします。長寿命magic linkではなく短いexpiryをbaselineにします。" },
          session: { en: "Recovery restricted", ja: "Recovery restricted" },
          assurance: { en: "Recovery proof", ja: "Recovery proof" },
          intent: "recovery",
          result: { en: "Restricted only", ja: "Restrictedのみ" },
          resultType: "warn",
          rule: { en: "Recovery proof creates a restricted recovery session, not a normal session.", ja: "Recovery proofから作るのはnormal sessionではなくrestricted recovery sessionです。" },
          progress: 0.32
        },
        {
          title: { en: "Inspect surviving credentials.", ja: "残っているCredentialを確認する。" },
          body: { en: "The restricted session may see enough credential state to choose a safe recovery path, without gaining destructive account powers.", ja: "Restricted sessionは安全な復旧経路を選ぶために必要なcredential状態を確認できますが、破壊的なaccount権限は持ちません。" },
          session: { en: "Recovery restricted", ja: "Recovery restricted" },
          assurance: { en: "Recovery proof", ja: "Recovery proof" },
          intent: "recovery",
          result: { en: "Constrained", ja: "制約中" },
          resultType: "warn",
          rule: { en: "Recovery is a constrained state transition.", ja: "Recoveryは制約された状態遷移です。" },
          progress: 0.5
        },
        {
          title: { en: "Rebuild an independent sign-in path.", ja: "独立したsign-in pathを再構築する。" },
          body: { en: "Add a replacement Passkey or complete an eligible provider reauthentication/link flow. The recovery session itself is not the final proof.", ja: "Replacement Passkeyを追加するか、適格なprovider reauthentication/linkを完了します。Recovery session自体を最終proofにはしません。" },
          session: { en: "Recovery restricted", ja: "Recovery restricted" },
          assurance: "A1",
          intent: "recovery",
          result: { en: "Rebuild proof", ja: "Proof再構築" },
          resultType: "neutral",
          rule: { en: "Recovery should restore a credential, not permanently replace credentials with email possession.", ja: "Recoveryではcredentialを復元し、email possessionを恒久的なcredential代替にしません。" },
          progress: 0.7
        },
        {
          title: { en: "Apply a security hold when independence is missing.", ja: "独立proofがない場合はSecurity holdを使う。" },
          body: { en: "If no independent credential survives, destructive replacement of the old authentication root should wait through a policy-defined hold.", ja: "独立credentialが残っていなければ、古いauthentication rootの破壊的置換はpolicyで定めたholdを経てから行います。" },
          session: { en: "Recovery restricted", ja: "Recovery restricted" },
          assurance: { en: "Recovery + hold", ja: "Recovery + hold" },
          intent: "recovery",
          result: { en: "Wait / verify", ja: "待機 / 検証" },
          resultType: "warn",
          rule: { en: "Recovery email alone does not satisfy the strongest assurance level.", ja: "Recovery email単独では最強のassuranceを満たしません。" },
          progress: 0.86
        },
        {
          title: { en: "Transition to normal only after policy is satisfied.", ja: "Policy充足後にだけNormalへ移行する。" },
          body: { en: "Once sufficient control has been rebuilt, issue a normal session and record the recovery security event.", ja: "十分なcontrolを再構築したらnormal sessionを発行し、recovery security eventを記録します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "recovery",
          result: { en: "Recovered", ja: "復旧完了" },
          resultType: "good",
          rule: { en: "Restricted recovery ends only after the account has a policy-approved sign-in path again.", ja: "Policy承認済みのsign-in pathをaccountが再び持って初めてrestricted recoveryを終了します。" },
          progress: 1
        }
      ]
    },
    lastMethod: {
      category: { en: "LAST-CREDENTIAL GUARD", ja: "最後のCredential保護" },
      steps: [
        {
          title: { en: "Request removal of a sign-in method.", ja: "Sign-in methodの削除を要求する。" },
          body: { en: "Credential removal is an authenticated account mutation, even if the user is already signed in.", ja: "Credential削除は、すでにsign-in中でも認証済みaccount mutationとして扱います。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A0",
          intent: "credential_remove",
          result: { en: "Need A1", ja: "A1が必要" },
          resultType: "warn",
          rule: { en: "A current session is not sufficient proof for changing authentication roots.", ja: "Current sessionだけではauthentication root変更の十分なproofになりません。" },
          progress: 0.2
        },
        {
          title: { en: "Prove A1 freshness.", ja: "A1 freshnessを証明する。" },
          body: { en: "The user reauthenticates with one eligible credential before the mutation is evaluated.", ja: "Mutation判定前に、eligible credentialを1つ使ってreauthenticateします。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "reauth",
          result: { en: "Fresh proof", ja: "Fresh proof" },
          resultType: "good",
          rule: { en: "Removing one credential requires fresh proof.", ja: "Credentialを1つ削除する操作にはfresh proofが必要です。" },
          progress: 0.45
        },
        {
          title: { en: "Count the usable methods that would remain.", ja: "削除後に残る利用可能methodを数える。" },
          body: { en: "The server evaluates usable sign-in methods after the proposed mutation, not just before it.", ja: "Serverはmutation前ではなく、mutation後に利用可能なsign-in methodがいくつ残るかを評価します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "credential_remove",
          result: { en: "0 would remain", ja: "残り0件" },
          resultType: "bad",
          rule: { en: "The final usable sign-in method is a server-side invariant.", ja: "最後の利用可能sign-in method保護はserver-side invariantです。" },
          progress: 0.72
        },
        {
          title: { en: "Block the mutation.", ja: "Mutationを拒否する。" },
          body: { en: "The credential stays in place. The UI should explain that another usable sign-in method must be added first.", ja: "Credentialはそのまま残します。先に別の利用可能sign-in methodを追加する必要があることをUIで説明します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A1",
          intent: "credential_remove",
          result: { en: "Blocked", ja: "拒否" },
          resultType: "bad",
          rule: { en: "Never let a user strand themselves with zero usable credentials.", ja: "利用可能credentialが0になる自己ロックアウトを許可しません。" },
          progress: 1
        }
      ]
    },
    delete: {
      category: { en: "DESTRUCTIVE ROOT CHANGE", ja: "破壊的Root変更" },
      steps: [
        {
          title: { en: "Start the destructive action explicitly.", ja: "破壊的操作を明示的に開始する。" },
          body: { en: "Account deletion is not treated as another settings toggle. It starts a higher-assurance ceremony.", ja: "Account削除を通常setting toggleの一つとして扱わず、より高保証なceremonyを開始します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A0",
          intent: "account_delete",
          result: { en: "Need A2", ja: "A2が必要" },
          resultType: "warn",
          rule: { en: "Destructive authentication-root changes require stronger proof than routine settings.", ja: "破壊的authentication-root変更は通常設定より強いproofを要求します。" },
          progress: 0.16
        },
        {
          title: { en: "Collect the first fresh proof family.", ja: "1つ目のfresh proof familyを集める。" },
          body: { en: "A Passkey or an eligible external provider can contribute one proof family.", ja: "Passkeyまたはeligible external providerが1つのproof familyになります。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: { en: "A2 · 1/2", ja: "A2 · 1/2" },
          intent: "reauth",
          result: { en: "Incomplete", ja: "未完了" },
          resultType: "warn",
          rule: { en: "Multiple synchronized Passkeys may still count as one proof family.", ja: "同期Passkeyが複数あっても1つのproof familyとして扱う場合があります。" },
          progress: 0.38
        },
        {
          title: { en: "Collect an independent second proof.", ja: "独立した2つ目のproofを集める。" },
          body: { en: "The second proof must be eligible and independent under product policy, rather than another copy of the same trust root.", ja: "2つ目は、同じtrust rootの別コピーではなく、product policy上eligibleかつ独立したproofである必要があります。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A2",
          intent: "reauth",
          result: { en: "Assured", ja: "保証成立" },
          resultType: "good",
          rule: { en: "A2 is about independence, not merely counting prompts.", ja: "A2で重要なのはprompt回数ではなくindependenceです。" },
          progress: 0.62
        },
        {
          title: { en: "Ask for destructive confirmation.", ja: "破壊的confirmationを求める。" },
          body: { en: "Strong authentication proves who is acting. A separate confirmation proves what they intend to do.", ja: "Strong authenticationは誰が操作しているかを証明します。別のconfirmationで、何をしようとしているかを確認します。" },
          session: { en: "Normal", ja: "Normal" },
          assurance: "A2",
          intent: "account_delete",
          result: { en: "Confirm intent", ja: "Intent確認" },
          resultType: "neutral",
          rule: { en: "Authentication and destructive intent confirmation solve different problems.", ja: "Authenticationとdestructive intent confirmationは別の問題を解決します。" },
          progress: 0.82
        },
        {
          title: { en: "Revoke access and record the event.", ja: "Accessを失効しeventを記録する。" },
          body: { en: "After the deletion policy completes, revoke sessions, invalidate stale grants, perform the deletion workflow, and retain only the audit material policy permits.", ja: "Deletion policy完了後、sessionを失効し、stale grantを無効化し、削除workflowを実行し、policyが許すaudit materialだけを保持します。" },
          session: { en: "Revoked", ja: "失効" },
          assurance: "A2",
          intent: "account_delete",
          result: { en: "Completed", ja: "完了" },
          resultType: "good",
          rule: { en: "Destructive root changes should leave deterministic revocation and audit consequences.", ja: "破壊的root変更には決定的なrevocationとauditの結果を伴わせます。" },
          progress: 1
        }
      ]
    }
  };

  const state = {
    lang: "en",
    flow: "signin",
    step: 0
  };

  translatable.forEach((node) => {
    node.dataset.enText = node.textContent;
  });

  const el = {
    category: document.getElementById("flow-category"),
    counter: document.getElementById("flow-step-counter"),
    stepLabel: document.getElementById("flow-step-label"),
    title: document.getElementById("flow-step-title"),
    body: document.getElementById("flow-step-body"),
    session: document.getElementById("flow-session"),
    assurance: document.getElementById("flow-assurance"),
    intent: document.getElementById("flow-intent"),
    result: document.getElementById("flow-result"),
    rule: document.getElementById("flow-rule"),
    prev: document.getElementById("flow-prev"),
    next: document.getElementById("flow-next"),
    reset: document.getElementById("flow-reset"),
    progress: document.getElementById("flow-progress"),
    line1: document.getElementById("flow-line-fill"),
    line2: document.getElementById("flow-line-fill-2"),
    stateDot: document.getElementById("state-dot")
  };

  const flowTabs = [...document.querySelectorAll("[data-flow]")];

  function local(value) {
    if (typeof value === "string") return value;
    return value[state.lang] ?? value.en ?? "";
  }

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "ja") return;
    state.lang = lang;
    root.lang = lang;
    document.title = lang === "ja"
      ? "Auth — 人間中心のアカウントセキュリティ"
      : "Auth — Human-centered account security";

    translatable.forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = lang === "ja" && ja[key] ? ja[key] : node.dataset.enText;
    });

    languageButtons.forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderFlow();
  }

  function renderProgress(total, current) {
    el.progress.replaceChildren();
    for (let index = 0; index < total; index += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "progress-dot";
      dot.classList.toggle("is-complete", index < current);
      dot.classList.toggle("is-current", index === current);
      dot.setAttribute("aria-label", `${state.lang === "ja" ? "ステップ" : "Step"} ${index + 1}`);
      dot.addEventListener("click", () => {
        state.step = index;
        renderFlow();
      });
      el.progress.append(dot);
    }
  }

  function renderFlow() {
    const flow = flows[state.flow];
    const step = flow.steps[state.step];
    const total = flow.steps.length;

    el.category.textContent = local(flow.category);
    el.counter.textContent = `${state.step + 1} / ${total}`;
    el.stepLabel.textContent = `${state.lang === "ja" ? "ステップ" : "STEP"} ${state.step + 1}`;
    el.title.textContent = local(step.title);
    el.body.textContent = local(step.body);
    el.session.textContent = local(step.session);
    el.assurance.textContent = local(step.assurance);
    el.intent.textContent = step.intent;
    el.result.textContent = local(step.result);
    el.rule.textContent = local(step.rule);

    el.result.className = `result-pill ${step.resultType}`;
    el.stateDot.className = `state-dot ${step.resultType}`;

    const first = Math.min(step.progress * 2, 1);
    const second = Math.max((step.progress - 0.5) * 2, 0);
    el.line1.style.width = `${first * 100}%`;
    el.line2.style.width = `${second * 100}%`;

    el.prev.disabled = state.step === 0;
    el.next.disabled = state.step === total - 1;
    el.next.textContent = state.lang === "ja" ? "次へ →" : "Next →";
    if (state.step === total - 1) {
      el.next.textContent = state.lang === "ja" ? "完了" : "Complete";
    }

    renderProgress(total, state.step);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  flowTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.flow = button.dataset.flow;
      state.step = 0;
      flowTabs.forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      renderFlow();
    });
  });

  el.prev.addEventListener("click", () => {
    state.step = Math.max(0, state.step - 1);
    renderFlow();
  });

  el.next.addEventListener("click", () => {
    const max = flows[state.flow].steps.length - 1;
    state.step = Math.min(max, state.step + 1);
    renderFlow();
  });

  el.reset.addEventListener("click", () => {
    state.step = 0;
    renderFlow();
  });

  setLanguage("en");
})();
