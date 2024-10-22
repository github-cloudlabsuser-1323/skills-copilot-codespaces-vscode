# Login to Azure
Connect-AzAccount

# Variables
$resourceGroupName = "myResourceGroup"
$location = "EastUS"
$storageAccountName = "mystorageaccount"
$skuName = "Standard_LRS"

# Create a resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a storage account
New-AzStorageAccount -ResourceGroupName $resourceGroupName `
                     -Name $storageAccountName `
                     -Location $location `
                     -SkuName $skuName `
                     -Kind StorageV2 `
                     -AccessTier Hot

Write-Output "Storage account '$storageAccountName' created successfully in resource group '$resourceGroupName'."