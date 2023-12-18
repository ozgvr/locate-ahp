export default function Page({title, children, description=null}){
    return(
        <div className="py-3">
            <div class="mb-4">
                <h1 class="h3 mb-0 text-gray-900">{title}</h1>
                {description && 
                    <p class="mb-0 text-gray-600">{description}</p>
                }
            </div>
            <hr/>
            {children}
        </div>
    );
}